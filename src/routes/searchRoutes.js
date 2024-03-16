// 路由文件路径: /src/routes/searchRoutes.js

const express = require('express');
const searchController = require('../controllers/searchController');
const router = express.Router();

// 绑定搜索物料请求到对应的控制器函数
router.get('/search', searchController.searchMaterials);

module.exports = router;