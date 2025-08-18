// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Wichtig: base = '/<Repo-Name>/'
export default defineConfig({
  plugins: [react()],
  base: '/Website-Portfolio/',
  build: { sourcemap: false }
})
