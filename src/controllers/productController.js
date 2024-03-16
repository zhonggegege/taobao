// 文件路径: /src/controllers/productController.js 三种与商品相关的控制器

const searchService = require('../services/searchService');
const itemShareConvertService = require('../services/itemShareConvertService');
const optimusMaterialService = require('../services/optimusMaterialService');

class ProductController {
  async searchProducts(req, res) {
    try {
      const { keywords } = req.query;
      const products = await searchService(keywords);
      res.json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: "搜索商品出错", error: error.message });
    }
  }

  async convertItemShare(req, res) {
    try {
      const { itemIds } = req.body;
      const links = await itemShareConvertService({ num_iids: itemIds.join(',') });
      res.json({ success: true, data: links });
    } catch (error) {
      res.status(500).json({ success: false, message: "转换商品分享链接出错", error: error.message });
    }
  }

  async getOptimusMaterial(req, res) {
    try {
      const { materialId } = req.query;
      const materials = await optimusMaterialService({ material_id: materialId });
      res.json({ success: true, data: materials });
    } catch (error) {
      res.status(500).json({ success: false, message: "获取物料精选推广出错", error: error.message });
    }
  }
}

module.exports = new ProductController();