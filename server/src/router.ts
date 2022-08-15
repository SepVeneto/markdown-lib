import type Router from "koa-router";
import fs from 'fs/promises'
import path from 'path'
import koaBody from "koa-body";
import { OUT_DIR } from "./main";
import { exec } from 'child_process'

export type SidebarItem = {
  text: string,
  link: string
}

export type Sidebar = {
  text: string,
  items: SidebarItem[]
}

async function getDir(folder: string) {
  const sidebar: Record<string, Sidebar[]> = {
    [`/${folder}/`]: [{ text: folder, items: [] }]
  };
  const dirs = await fs.readdir(OUT_DIR, { withFileTypes: true })
  for (const dir of dirs) {
    if (dir.isDirectory()) {
      const _folder = sidebar[`/${folder}/`][0]
      _folder.items = await getFiles(path.join(OUT_DIR, dir.name))
    }
  }
  return sidebar
}
async function getFiles(dirPath: string) {
  const files = await fs.readdir(dirPath, { withFileTypes: true })
  const list: SidebarItem[] = []
  for (const file of files) {
    if (file.isFile()) {
      const _name = path.parse(file.name).name
      const _dir = dirPath.split('\\').pop()
      list.push({ text: _name, link: `/${_dir}/${_name}`})
    }
  }
  return list
}
export default function init(router: Router) {
  router.put('/api/v1/markdown/docs', koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(OUT_DIR, 'docs'),
      keepExtensions: true,
      onFileBegin: (name, file) => {
        const dir = path.join(OUT_DIR, 'docs')
        file.filepath = path.join(dir, file.originalFilename ?? name)
        console.log(file.filepath)
      }
    },
    onError(err) {
      console.error(err)
    }
  }), async (ctx) => {
    const files = ctx.request.files
    const sidebar = await getDir('docs')
    fs.writeFile(path.resolve(OUT_DIR, '../.vitepress/sidebar.json'), JSON.stringify(sidebar, null, 2), 'utf-8')
    // const sidebar = JSON.parse(await fs.readFile('E:\\markdown-lib\\markdown\\.vitepress\\sidebar.json', 'utf-8'))
    // console.log(sidebar)
    ctx.response.body = '上传成功'
    exec('cd /app/markdown && npm run build', (err, stdout, stderr) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(`stdout: ${stdout}`)
      if (stderr) {
        console.error(`stderr: ${stderr}`)
      }
    })
  })
}
