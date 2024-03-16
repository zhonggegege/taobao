// /src/models/userActionModel.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// 用户行为模型定义
class UserAction extends Model {}

UserAction.init({
  // 跟据实际数据库字段定义模型的属性
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // 这里是users表的表名
      key: 'id',
    },
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products', // 这里是products表的表名
      key: 'id',
    },
  },
  action_type: {
    type: DataTypes.ENUM('click', 'view', 'wishlist', 'share'),
    allowNull: false,
  },
  action_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'UserAction',
});

module.exports = UserAction;