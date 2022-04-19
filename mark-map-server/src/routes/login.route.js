const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const promisify = require('bluebird').promisify;
const sign = promisify(jwt.sign);

const router = new Router();

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (!username || !password) throw Error('输入账户名密码有误');
  const User = sequelize.models.User;
  const res = await User.findOne({ where: { username, password } });
  if (res) {
    let token = await sign(
      { username, password, id: res.id },
      globalConfig.token.privateKey,
      {
        expiresIn: eval(globalConfig.token.expiresIn)
      }
    );
    ctx.body = { token, username };
  } else {
    throw Error('输入账户名密码有误');
  }
});

router.post('/register', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (!username || !password) throw Error('输入账户名密码有误');
  const User = sequelize.models.User;
  const res = await User.findOne({ where: { username, password } });
  if (res) throw Error('该账户名已被注册，请修改后重新注册');
  const res2 = await User.create({ username, password });
  ctx.body = res2;
});

module.exports = router;
