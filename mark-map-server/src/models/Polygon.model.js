const { DataTypes } = require('sequelize');

module.exports = sequelize.define(
  'Polygon',
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
    symbol: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: '样式'
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
  { paranoid: true }
);
