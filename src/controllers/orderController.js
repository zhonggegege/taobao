// 文件路径: /src/controllers/orderController.js 订单相关的服务模块控制器

const orderDetailsService = require('../services/orderDetailsService');
const cpOrderDetailsService = require('../services/cpOrderDetailsService');

class OrderController {
  async getOrderDetails(req, res) {
    try {
      const options = req.query; // 获取查询参数，如时间范围、页码等
      const orderDetails = await orderDetailsService(options);
      res.json({ success: true, data: orderDetails });
    } catch (error) {
      res.status(500).json({ success: false, message: "查询订单详情出错", error: error.message });
    }
  }

  async getCpOrderDetails(req, res) {
    try {
      const options = req.query; // 获取查询参数
      const cpOrderDetails = await cpOrderDetailsService(options);
      res.json({ success: true, data: cpOrderDetails });
    } catch (error) {
      res.status(500).json({ success: false, message: "查询服务费订单明细出错", error: error.message });
    }
  }
}

module.exports = new OrderController();