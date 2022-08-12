import { defineConfigWithTheme } from "vitepress";
const nav = [
  {
    text: '文档',
    activeMatch: `^/(guide|style-guide|cookbook|examples)/`,
    link: '/docs/'
    // items: [
    //   { text: 'Guide', link: '/guide/introduction' },
    //   { text: 'Tutorial', link: '/tutorial/' },
    //   { text: 'Examples', link: '/examples/' },
    //   { text: 'Quick Start', link: '/guide/quick-start' },
    //   // { text: 'Style Guide', link: '/style-guide/' },
    //   {
    //     text: 'Vue 2 Docs',
    //     link: 'https://v2.vuejs.org'
    //   },
    //   {
    //     text: 'Migration from Vue 2',
    //     link: 'https://v3-migration.vuejs.org/'
    //   }
    // ]
  },
  // {
  //   text: 'Partners',
  //   link: '/partners/',
  //   activeMatch: `^/partners/`
  // }
]
export const sidebar = {
  '/docs/': [
    {
      text: 'docs',
      items: [
        {
          text: 'need to focus',
          // link: '/guide/introduction'
          link: '/docs/need to focus',
        }
      ]
    }
  ]
}

export default defineConfigWithTheme({
  srcDir: 'src',
  themeConfig: {
    nav,
    sidebar,
  },
  vite: {
    server: {
      proxy: {
        '/api/v1': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api\/v1/, '')
        }
      },
      fs: {
        allow: ['../..']
      }
    }
  }
})