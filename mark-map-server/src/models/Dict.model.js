const { DataTypes } = require('sequelize');

module.exports = sequelize.define('Dict', {
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
