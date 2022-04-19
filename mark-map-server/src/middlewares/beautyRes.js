module.exports = () => async (ctx, next) => {
  await next();
  ctx.body
    ? (ctx.body = { code: 200, data: ctx.body })
    : (ctx.body = { code: 404, data: '没有该资源' });
};
