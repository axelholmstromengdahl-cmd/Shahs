import { Router } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import multer from 'multer';
import { validate } from '../lib/validate.js';
import { saveSubmission, CV_DIR } from '../lib/store.js';

const router = Router();

const CV_TYPES = new Set(['.pdf', '.doc', '.docx']);
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => fs.mkdir(CV_DIR, { recursive: true }, err => cb(err, CV_DIR)),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${path.extname(file.originalname).toLowerCase()}`),
  }),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    if (CV_TYPES.has(path.extname(file.originalname).toLowerCase())) return cb(null, true);
    cb(Object.assign(new Error('CV:t måste vara PDF eller Word.'), { status: 400, fields: { cv: 'CV:t måste vara PDF eller Word.' } }));
  },
});

const SCHEMAS = {
  contact: {
    restaurant: { required: true, max: 120 },
    name: { required: true, max: 120 },
    email: { required: true, email: true, max: 200 },
    message: { required: true, max: 5000 },
    consent: { required: true, checkbox: true },
  },
  franchise: {
    name: { required: true, max: 120 },
    phone: { required: true, max: 40 },
    email: { required: true, email: true, max: 200 },
    age: { required: true, int: true, min: 18, maxValue: 99 },
    city: { required: true, max: 120 },
    financing: { required: true, oneOf: ['Eget kapital', 'Banklån', 'Eget kapital och banklån', 'Investerare eller partner', 'Annat'] },
    capital: { required: true, max: 120 },
    partner: { required: true, oneOf: ['ensam', 'partner'] },
    motivation: { required: true, max: 5000 },
  },
  'job-application': {
    job: { required: true, max: 80 },
    name: { required: true, max: 120 },
    email: { required: true, email: true, max: 200 },
    phone: { required: true, max: 40 },
    location: { required: true, max: 120 },
    message: { required: true, max: 5000 },
  },
  referral: {
    name: { required: true, max: 120 },
    friendName: { required: true, max: 120 },
    friendEmail: { required: true, email: true, max: 200 },
  },
};

function handle(type, { file } = {}) {
  return async (req, res, next) => {
    try {
      const { data, errors } = validate(SCHEMAS[type], req.body);
      if (file && !req.file) errors[file] = 'Bifoga ditt CV.';
      if (Object.keys(errors).length) {
        if (req.file) fs.rm(req.file.path, { force: true }, () => {});
        return res.status(400).json({ ok: false, error: 'Kontrollera de markerade fälten.', fields: errors });
      }
      if (req.file) data[file] = { originalName: req.file.originalname, storedAs: req.file.filename, size: req.file.size };
      const record = await saveSubmission(type, data);
      res.status(201).json({ ok: true, id: record.id });
    } catch (err) {
      next(err);
    }
  };
}

router.post('/contact', handle('contact'));
router.post('/franchise', handle('franchise'));
router.post('/jobs/apply', upload.single('cv'), handle('job-application', { file: 'cv' }));
router.post('/referrals', handle('referral'));

export default router;
