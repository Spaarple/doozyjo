import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/doozyjo/', // très important pour GitHub Pages
  plugins: [react()],
})
