import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ...other configuration options
  server: {
    // Enable history API fallback
    historyApiFallback: true,
  },
})
