const Router = require('koa-router');
const updateMapTime = require('../utils/updateMapTime');

const router = new Router();

router.get('/point/list', async (ctx, next) => {
  const { mapId } = ctx.request.query;
  const Point = sequelize.models.Point;
  const res = await Point.findAndCountAll({ where: { mapId } });
  ctx.body = res;
});

router.post('/point/add', verifyToken, verifyMapAuth, async (ctx, next) => {
  const Point = sequelize.models.Point;
  const res = await Point.create({
    ...ctx.request.body
  });
  await updateMapTime(ctx.request.body.mapId);
  ctx.body = res;
});

router.post('/point/edit', verifyToken, verifyMapAuth, async (ctx, next) => {
  const Point = sequelize.models.Point;
  const res = await Point.update(
    {
      ...ctx.request.body
    },
    { where: { id: ctx.request.body.id } }
  );
  await updateMapTime(ctx.request.body.mapId);
  ctx.body = res;
});

router.post('/point/del', verifyToken, verifyMapAuth, async (ctx, next) => {
  const Point = sequelize.models.Point;
  const res = await Point.destroy({
    where: { id: ctx.request.body.id }
  });
  await updateMapTime(ctx.request.body.mapId);
  ctx.body = res;
});

module.exports = router;
