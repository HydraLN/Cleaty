import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path';

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'nested/login.html'),
        about: resolve(__dirname, 'nested/about.html'),
      }
    },
  },
  server: {
    open: '/index.html',
    fs: {
      allow: ['.'],
    },
  },
})


