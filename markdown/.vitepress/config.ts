import { defineConfigWithTheme } from "vitepress";
const nav = [
  {
    text: 'Docs',
    activeMatch: `^/(guide|style-guide|cookbook|examples)/`,
    items: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Tutorial', link: '/tutorial/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'Quick Start', link: '/guide/quick-start' },
      // { text: 'Style Guide', link: '/style-guide/' },
      {
        text: 'Vue 2 Docs',
        link: 'https://v2.vuejs.org'
      },
      {
        text: 'Migration from Vue 2',
        link: 'https://v3-migration.vuejs.org/'
      }
    ]
  },
  {
    text: 'API',
    activeMatch: `^/api/`,
    link: '/api/'
  },
  {
    text: 'Playground',
    link: 'https://sfc.vuejs.org'
  },
  {
    text: 'Ecosystem',
    activeMatch: `^/ecosystem/`,
    items: [
      {
        text: 'Resources',
        items: [
          { text: 'Partners', link: '/partners/' },
          { text: 'Themes', link: '/ecosystem/themes' },
          { text: 'Jobs', link: 'https://vuejobs.com/?ref=vuejs' },
          { text: 'T-Shirt Shop', link: 'https://vue.threadless.com/' }
        ]
      },
      {
        text: 'Official Libraries',
        items: [
          { text: 'Vue Router', link: 'https://router.vuejs.org/' },
          { text: 'Pinia', link: 'https://pinia.vuejs.org/' },
          { text: 'Tooling Guide', link: '/guide/scaling-up/tooling.html' }
        ]
      },
      {
        text: 'Video Courses',
        items: [
          {
            text: 'Vue Mastery',
            link: 'https://www.vuemastery.com/courses/'
          },
          {
            text: 'Vue School',
            link: 'https://vueschool.io/?friend=vuejs&utm_source=Vuejs.org&utm_medium=Link&utm_content=Navbar%20Dropdown'
          }
        ]
      },
      {
        text: 'Help',
        items: [
          {
            text: 'Discord Chat',
            link: 'https://discord.com/invite/HBherRA'
          },
          {
            text: 'GitHub Discussions',
            link: 'https://github.com/vuejs/core/discussions'
          },
          { text: 'DEV Community', link: 'https://dev.to/t/vue' }
        ]
      },
      {
        text: 'News',
        items: [
          { text: 'Blog', link: 'https://blog.vuejs.org/' },
          { text: 'Twitter', link: 'https://twitter.com/vuejs' },
          { text: 'Newsletter', link: 'https://news.vuejs.org/' },
          { text: 'Events', link: 'https://events.vuejs.org/' }
        ]
      }
    ]
  },
  {
    text: 'About',
    activeMatch: `^/about/`,
    items: [
      { text: 'FAQ', link: '/about/faq' },
      { text: 'Team', link: '/about/team' },
      { text: 'Releases', link: '/about/releases' },
      {
        text: 'Community Guide',
        link: '/about/community-guide'
      },
      { text: 'Code of Conduct', link: '/about/coc' },
      {
        text: 'The Documentary',
        link: 'https://www.youtube.com/watch?v=OrxmtDw4pVI'
      }
    ]
  },
  {
    text: 'Sponsor',
    link: '/sponsor/'
  },
  {
    text: 'Partners',
    link: '/partners/',
    activeMatch: `^/partners/`
  }
]
export const sidebar = {
  '/guide/': [
    {
      text: 'Getting Start',
      items: [
        {
          text: 'introduction',
          link: '/guide/introduction'
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
  }
})