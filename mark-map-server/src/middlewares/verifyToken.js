const jwt = require('jsonwebtoken');
const promisify = require('bluebird').promisify;
const verify = promisify(jwt.verify);

module.exports = async (ctx, next) => {
  const authorization = ctx.request.headers.authorization || '';
  const token = authorization.replace('Bearer ', '');
  const userInfo = await verify(token, globalConfig.token.privateKey);
  ctx.request.userInfo = userInfo;
  await next();
};
