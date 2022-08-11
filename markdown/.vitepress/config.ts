import { defineConfigWithTheme } from "vitepress";

export const sidebar = {
  '/guide/': [
    {
      text: 'test',
    }
  ]
}

export default defineConfigWithTheme({
  srcDir: 'src',
  themeConfig: {
    sidebar,
  }
})