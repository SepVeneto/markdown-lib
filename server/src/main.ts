import Koa from 'koa'
import Router from 'koa-router'
import path from 'path'
import apis from './router'
import envFlow from 'dotenv-flow'
import { updateSidebar } from './router'

envFlow.config()

const app = new Koa()
const router = new Router()
export const OUT_DIR = path.resolve(__dirname, '../../markdown/src')

async function init() {
  await updateSidebar()

  apis(router)
  app.use(router.routes());

  app.use(async ctx => {
    const res = ctx.response.body;
    ctx.response.body = {
      code: 0,
      msg: null,
      data: res
    }
  })

  app.listen(8000)
  console.log('listening 8000...')
}

init()
