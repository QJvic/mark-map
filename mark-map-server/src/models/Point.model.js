const { DataTypes } = require('sequelize');

module.exports = sequelize.define(
  'Point',
  {
    mapId: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '所属父级mapId'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '标题'
    },
    subName: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '子标题'
    },
    coordinate: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: '经纬度'
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '图标',
      get() {
        return globalConfig.app.serverUrl + this.getDataValue('icon');
      },
      set(val) {
        val = val.replace(globalConfig.app.serverUrl, '');
        this.setDataValue('icon', val);
      }
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      comment: '标签'
    },
    table: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      comment: '属性表格'
    }
  },
  {
    paranoid: true,
    hooks: {
      afterBulkCreate(instances, options) {}
    }
  }
);
