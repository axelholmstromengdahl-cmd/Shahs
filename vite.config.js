import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// In dev, Vite serves the site on :5173 and forwards /api to the Express server on :3001.
// BASE_PATH lets the GitHub Pages build live under /<repo>/ (set by .github/workflows/deploy.yml).
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:3001' },
  },
});
