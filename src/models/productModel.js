// 文件路径: /src/models/productModel.js
// 商品模型 productModel.js

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./index'); // 假设index.js配置了Sequelize实例

class Product extends Model {}

Product.init({
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: DataTypes.DECIMAL(10, 2),
  imageUrl: DataTypes.STRING,
  category: DataTypes.STRING,
  isPromoted: DataTypes.BOOLEAN,
  promotionPriority: DataTypes.INTEGER
}, { sequelize, modelName: 'product' });

module.exports = Product;