const Router = require('koa-router');

const router = new Router();

router.get('/map/list', verifyToken, async (ctx, next) => {
  const Map = sequelize.models.Map;
  const res = await Map.findAndCountAll({
    where: { pid: ctx.request.userInfo.id }
  });
  ctx.body = res;
});

router.post('/map/del', verifyToken, verifyMapAuth, async (ctx, next) => {
  const { mapId: id } = ctx.request.body;
  const Map = sequelize.models.Map;
  const res = await Map.destroy({
    where: { id }
  });
  ctx.body = res;
});

router.post('/map/add', verifyToken, async (ctx, next) => {
  const Map = sequelize.models.Map;
  const res = await Map.create({
    ...ctx.request.body,
    pid: ctx.request.userInfo.id
  });
  ctx.body = res;
});

router.post('/map/update', verifyToken, verifyMapAuth, async (ctx, next) => {
  const { mapId: id } = ctx.request.body;
  const Map = sequelize.models.Map;
  const res = await Map.update(
    { ...ctx.request.body },
    { where: { pid: ctx.request.userInfo.id, id } }
  );
  ctx.body = res;
});

module.exports = router;
