const Router = require('koa-router');
const updateMapTime = require('../utils/updateMapTime');

const router = new Router({ prefix: '/polyline' });

router.get('/list', async (ctx, next) => {
  const { mapId } = ctx.request.query;
  const Polyline = sequelize.models.Polyline;
  const res = await Polyline.findAndCountAll({ where: { mapId } });
  ctx.body = res;
});

router.post('/add', verifyToken, verifyMapAuth, async (ctx, next) => {
  const Polyline = sequelize.models.Polyline;
  const res = await Polyline.create({
    ...ctx.request.body
  });
  await updateMapTime(ctx.request.body.mapId);
  ctx.body = res;
});

router.post('/edit', verifyToken, verifyMapAuth, async (ctx, next) => {
  const Polyline = sequelize.models.Polyline;
  const res = await Polyline.update(
    {
      ...ctx.request.body
    },
    { where: { id: ctx.request.body.id } }
  );
  await updateMapTime(ctx.request.body.mapId);
  ctx.body = res;
});

router.post('/del', verifyToken, verifyMapAuth, async (ctx, next) => {
  const Polyline = sequelize.models.Polyline;
  const res = await Polyline.destroy({
    where: { id: ctx.request.body.id }
  });
  await updateMapTime(ctx.request.body.mapId);
  ctx.body = res;
});

module.exports = router;
