const jwt = require('jsonwebtoken');

module.exports = () => async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      ctx.body = {
        code: 401,
        message: '登陆过期'
      };
    } else if (error instanceof jwt.JsonWebTokenError) {
      ctx.body = {
        code: 401,
        message: 'token验证错误'
      };
    } else {
      ctx.body = {
        code: 500,
        message: error.message
      };
      console.log(error);
    }
  }
};
