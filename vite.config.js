import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Website-Portfolio/',   // <- exakt dein Repo-Name, mit führendem & abschließendem Slash
  build: { sourcemap: false }
})
