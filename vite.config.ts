import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFile } from 'node:fs/promises';
import path from 'node:path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'spa-404-fallback',
      async closeBundle() {
        const outDir = path.resolve(process.cwd(), 'dist');
        await copyFile(path.join(outDir, 'index.html'), path.join(outDir, '404.html'));
      },
    },
  ],
});
