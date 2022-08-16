import type Router from "koa-router";
import fs from 'fs/promises'
import path from 'path'
import koaBody from "koa-body";
import { OUT_DIR } from "./main";
import { execSync } from 'child_process'
import os from 'os'
import fetch from 'node-fetch'

const SEPARATOR = os.platform() === 'win32' ? '\\' : '/'

export type SidebarItem = {
  text: string,
  link: string
}

export type Sidebar = {
  text: string,
  items: SidebarItem[]
}

async function getDir(folder: string) {
  // const dirs = await fs.readdir(path.resolve(OUT_DIR, folder, 'md'), { withFileTypes: true })
  const items = await getFiles(path.resolve(OUT_DIR, folder, 'md'))
  // for (const dir of dirs) {
  //   if (dir.isDirectory()) {
  //     const _folder = sidebar[`/${folder}/`][0]
  //     _folder.items = await getFiles(path.join(OUT_DIR, dir.name))
  //   }
  // }
  const sidebar: Record<string, Sidebar[]> = {
    [`/${folder}/`]: [{ text: folder, items }]
  };
  return sidebar
}
async function getFiles(dirPath: string) {
  const files = await fs.readdir(dirPath, { withFileTypes: true })
  const list: SidebarItem[] = []
  for (const file of files) {
    if (file.isFile()) {
      const _name = path.parse(file.name).name
      console.log(dirPath)
      const _dir = dirPath.split(SEPARATOR).splice(-2, 1)
      list.push({ text: _name, link: `/${_dir}/md/${_name}`})
    }
  }
  return list
}
export default function init(router: Router) {
  router.put('/api/v1/markdown/docs', koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(OUT_DIR, 'docs/md'),
      keepExtensions: true,
      onFileBegin: (name, file) => {
        const dir = path.join(OUT_DIR, 'docs/md')
        file.filepath = path.join(dir, file.originalFilename ?? name)
      }
    },
    onError(err) {
      console.error(err)
    }
  }), async (ctx) => {
    const files = ctx.request.files
    const name = Array.isArray(files?.file) ?
      path.parse(files?.file[0].originalFilename ?? '').name :
      path.parse(files?.file.originalFilename ?? '').name
    const sidebar = await getDir('docs')
    console.log('start file write')
    await fs.writeFile(path.resolve(OUT_DIR, '../.vitepress/sidebar.json'), JSON.stringify(sidebar, null, 2), 'utf-8')
    console.log('file write success!!')
    ctx.response.body = '上传成功'
    try {
      console.log('start web build')
      execSync('cd /app/markdown && npm run build')
      console.log('web build success!!')
    } catch(e) {
      console.error(e)
    } finally {
      const jumpLink = name ? `http://10.7.12.26:9000/docs/md/${encodeURIComponent(name)}.html` : 'http://http://10.7.12.26:9000/docs'
      fetch('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=133ef98b-4875-429c-a26d-3cbb98a955ff', {
        method: 'POST',
        body: JSON.stringify({
          msgtype: 'markdown',
          markdown: {
            content: `文档平台更新\n
            [${name}](${jumpLink})\n`
          }
        })
      })
    }
  })
}
