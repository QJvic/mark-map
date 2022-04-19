const Router = require('koa-router');
const updateMapTime = require('../utils/updateMapTime');

const router = new Router({ prefix: '/polygon' });

router.get('/list', async (ctx, next) => {
  const { mapId } = ctx.request.query;
  const Polygon = sequelize.models.Polygon;
  const res = await Polygon.findAndCountAll({ where: { mapId } });
  ctx.body = res;
});

router.post('/add', verifyToken, verifyMapAuth, async (ctx, next) => {
  const Polygon = sequelize.models.Polygon;
  console.log(ctx.request.body);
  const res = await Polygon.create({
    ...ctx.request.body
  });
  await updateMapTime(ctx.request.body.mapId);
  ctx.body = res;
});

router.post('/edit', verifyToken, verifyMapAuth, async (ctx, next) => {
  const Polygon = sequelize.models.Polygon;
  const res = await Polygon.update(
    {
      ...ctx.request.body
    },
    { where: { id: ctx.request.body.id } }
  );
  ctx.body = res;
});

router.post('/del', verifyToken, verifyMapAuth, async (ctx, next) => {
  const Polygon = sequelize.models.Polygon;
  const res = await Polygon.destroy({
    where: { id: ctx.request.body.id }
  });
  await updateMapTime(ctx.request.body.mapId);
  ctx.body = res;
});

module.exports = router;
