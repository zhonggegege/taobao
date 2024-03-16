// 文件路径: /src/config/db.js

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

// 创建数据库连接的实例
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT, // 一般为 'mysql'|'sqlite'|'postgres'|'mssql' 等
  port: process.env.DB_PORT,
  logging: false, // 根据需要设置日志功能
  // 其他数据库连接选项
});

module.exports = sequelize;