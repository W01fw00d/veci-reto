import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  publicDir: fileURLToPath(new URL('../../public', import.meta.url)),
  plugins: [react(), tailwindcss()],
});
