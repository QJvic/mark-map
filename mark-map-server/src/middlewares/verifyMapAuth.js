module.exports = async (ctx, next) => {
  const Map = sequelize.models.Map;
  try {
    const valid = await Map.count({
      where: { pid: ctx.request.userInfo.id, id: ctx.request.body.mapId }
    });
    if (!valid) throw Error('没有该地图的编辑权限');
  } catch (e) {
    throw Error('没有该地图的编辑权限');
  }

  await next();
};
