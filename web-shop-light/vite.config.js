import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Prepričajte se, da je .jsx vključeno
  },
  server: {
    host: '0.0.0.0', // Posluša na vseh naslovih
    port: 5173,      // Prilagodite po potrebi
  },
})
