// 文件路径: /app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
// 引入路由
const searchRoutes = require('./src/routes/searchRoutes');
const app = express();

// 配置环境变量
dotenv.config();

// 配置跨域中间件
app.use(cors());

// 配置解析JSON请求体的中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 设置静态文件目录
app.use(express.static('public'));

// 使用路由
app.use('/api', searchRoutes);

// 以下代码连接数据库（伪代码，需要根据实际情况实现）
// const db = require('./src/config/db'); // 引入数据库配置文件
// db.connect(); // 连接数据库

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

module.exports = app;