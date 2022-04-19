const Router = require('koa-router');
const { Op } = require('sequelize');

const router = new Router();

router.get('/pointIcon/list', verifyToken, async (ctx, next) => {
  const PointIcon = sequelize.models.PointIcon;
  const res = await PointIcon.findAndCountAll({
    where: {
      [Op.or]: [{ userId: ctx.request.userInfo.id }, { userId: null }]
    }
  });
  ctx.body = res;
});

router.post('/pointIcon/add', verifyToken, async (ctx, next) => {
  const PointIcon = sequelize.models.PointIcon;
  const res = await PointIcon.create({
    path: ctx.request.body.path,
    userId: ctx.request.userInfo.id
  });
  ctx.body = res;
});

module.exports = router;
