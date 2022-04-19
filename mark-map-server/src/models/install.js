const path = require('path');
const { Sequelize } = require('sequelize');
const walkFolderSync = require('../utils/walkFolderSync');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../mark-map.db'),
  define: {
    freezeTableName: true,
    paranoid: true,
    defaultScope: {
      attributes: { exclude: ['deletedAt'] }
    }
  }
});
global.sequelize = sequelize;

// 数据模型
walkFolderSync(__dirname, file => {
  if (file.endsWith('.model.js')) require(file);
});

module.exports = async () => {
  await sequelize.sync({ alter: true });
  console.log('所有模型均已成功同步');
  // 没有root用户，默认为第一次运行，初始化数据库
  const User = sequelize.models.User;
  const hasRoot = await User.count({
    where: { username: globalConfig.db.defaultUser.username }
  });
  if (!hasRoot) {
    await createDefaultData();
  }
};

async function createDefaultData() {
  // 创建默认用户
  const User = sequelize.models.User;
  const defaultUser = globalConfig.db.defaultUser;
  await User.create({
    username: defaultUser.username,
    password: defaultUser.password
  });
  // 创建默认图标
  const pointIconData = [
    '定位1.png',
    '定位2.png',
    '定位3.png',
    '定位4.png'
  ].map(item => ({ path: '/static/icons/point/' + item }));
  const PointIcon = sequelize.models.PointIcon;
  await PointIcon.bulkCreate(pointIconData);
}
