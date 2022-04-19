module.exports = async function (id) {
  const Map = sequelize.models.Map;
  const map = await Map.findOne({ where: { id } });
  map.changed('updatedAt', true);
  await map.update({ updatedAt: new Date() });
};
