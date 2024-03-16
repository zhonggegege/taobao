// 文件路径: /src/models/userModel.js

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./index');

class User extends Model {}

User.init({
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password_hash: DataTypes.STRING
}, { sequelize, modelName: 'user' });

module.exports = User;