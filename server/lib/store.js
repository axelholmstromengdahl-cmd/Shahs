import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

export const STORAGE = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'storage');
export const CV_DIR = path.join(STORAGE, 'cv');
const SUBMISSIONS = path.join(STORAGE, 'submissions');

// Appends one submission as a JSON line to storage/submissions/<type>.jsonl.
export async function saveSubmission(type, data) {
  await fs.mkdir(SUBMISSIONS, { recursive: true });
  const record = { id: crypto.randomUUID(), type, createdAt: new Date().toISOString(), ...data };
  await fs.appendFile(path.join(SUBMISSIONS, `${type}.jsonl`), JSON.stringify(record) + '\n', 'utf8');
  return record;
}
