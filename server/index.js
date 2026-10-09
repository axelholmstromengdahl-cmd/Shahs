import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import multer from 'multer';
import formsRouter from './routes/forms.js';
import { rateLimit } from './lib/rateLimit.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, '..', 'dist');
const PORT = Number(process.env.PORT) || 3001;

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '50kb' }));

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api', rateLimit({ windowMs: 10 * 60 * 1000, max: 20 }), formsRouter);
app.use('/api', (req, res) => res.status(404).json({ ok: false, error: 'Hittades inte.' }));

// After `npm run build`, the same server also serves the built site.
if (fs.existsSync(DIST)) {
  app.use(express.static(DIST));
  app.get('*', (req, res) => res.sendFile(path.join(DIST, 'index.html')));
}

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const error = err.code === 'LIMIT_FILE_SIZE' ? 'Filen är för stor. Max 5 MB.' : 'Filen kunde inte tas emot.';
    return res.status(400).json({ ok: false, error, fields: { cv: error } });
  }
  if (err && err.status === 400) return res.status(400).json({ ok: false, error: err.message, fields: err.fields });
  console.error(err);
  res.status(500).json({ ok: false, error: 'Något gick fel. Försök igen om en stund.' });
});

app.listen(PORT, () => console.log(`Shah's API på http://localhost:${PORT}`));
