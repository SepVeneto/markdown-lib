import { defineConfigWithTheme } from "vitepress";
import nav from './nav.json'
import sidebarJson from './sidebar.json'

export const sidebar = sidebarJson

export default defineConfigWithTheme({
  srcDir: 'src',
  themeConfig: {
    nav,
    sidebar: sidebarJson,
  },
  vite: {
    server: {
      proxy: {
        '/api/v1': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/api\/v1/, '')
        }
      },
      fs: {
        allow: ['../..']
      }
    }
  }
})
