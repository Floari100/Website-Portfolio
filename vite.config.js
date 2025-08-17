// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // wichtig: dein Repo-Name inkl. Slashes
  base: '/Website-Portfolio/',
  build: { sourcemap: false } // optional, vermeidet .map-Themen
})
