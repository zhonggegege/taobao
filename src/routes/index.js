// 文件路径: /src/routes/index.js

const express = require('express');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const promotionController = require('../controllers/promotionController');

const router = express.Router();

// 商品相关API
router.get('/api/products/search', productController.searchProducts);
router.post('/api/products/share/convert', productController.convertItemShare);
router.get('/api/products/optimus/material', productController.getOptimusMaterial);

// 订单相关API
router.get('/api/orders/details', orderController.getOrderDetails);
router.get('/api/orders/service/details', orderController.getCpOrderDetails);

// 推广相关API
router.get('/api/promotion/activity/info', promotionController.getActivityInfo);
router.get('/api/promotion/optimus/promotion', promotionController.getOptimusPromotion);
router.post('/api/promotion/tpwd/share/convert', promotionController.convertTpwdShare);

module.exports = router;