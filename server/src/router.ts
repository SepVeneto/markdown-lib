import type Router from "koa-router";
export default function init(router: Router) {
  router.put('/markdown', async (ctx) => {
    const files = ctx.request.files
    ctx.response.body = '上传成功'
  })
}