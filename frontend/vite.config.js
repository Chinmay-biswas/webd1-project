// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from "vite-tsconfig-paths"
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server:{
    proxy:{
      "/api":{
        target:"http://localhost:5000",
        changeOrigin: true,
        secure: false, // 👈 this is the port your backend server is running on
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 👈 this tells Vite what `@` means
    },
  },
});
