import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'
import path from 'path'
import apis from './router'

const app = new Koa()
const router = new Router()
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: '/data',
    keepExtensions: true,
    onFileBegin: (name, file) => {
      const dir = '/data'
      file.filepath = `${dir}/${file.originalFilename}`
    }
  },
  onError(err) {
    console.error(err)
  }
}))

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