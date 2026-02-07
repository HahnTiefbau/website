import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import vitePluginSvgr from "vite-plugin-svgr";
import {fileURLToPath, URL} from "url";

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), vitePluginSvgr()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '^/.*\\.php$': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
