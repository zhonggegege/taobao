// 配置文件路径: /src/config/index.js

const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

module.exports = {
  port: process.env.PORT,
  db: {
    uri: process.env.DB_URI,
  },
  api: {
    key: process.env.API_KEY,
    secret: process.env.API_SECRET
  },
  // 其他全局配置变量
};