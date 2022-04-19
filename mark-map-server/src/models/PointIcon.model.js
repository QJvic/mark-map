const { DataTypes } = require('sequelize');

module.exports = sequelize.define('PointIcon', {
  type: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '图标类型，后续使用'
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '图片路径',
    get() {
      return globalConfig.app.serverUrl + this.getDataValue('path');
    },
    set(val) {
      val = val.replace(globalConfig.app.serverUrl, '');
      this.setDataValue('path', val);
    }
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '所属用户，为空表示所有用户可用'
  }
});
