// 文件路径: /src/controllers/promotionController.js 推广相关的服务模块控制器

const activityInfoService = require('../services/activityInfoService');
const optimusPromotionService = require('../services/optimusPromotionService');
const tpwdShareConvertService = require('../services/tpwdShareConvertService');

class PromotionController {
  async getActivityInfo(req, res) {
    try {
      const { activityMaterialId, adZoneId } = req.query;
      const activityInfo = await activityInfoService(activityMaterialId, adZoneId);
      res.json({ success: true, data: activityInfo });
    } catch (error) {
      res.status(500).json({ success: false, message: "获取活动信息出错", error: error.message });
    }
  }

  async getOptimusPromotion(req, res) {
    try {
      const options = req.query;
      const optimusPromotion = await optimusPromotionService(options);
      res.json({ success: true, data: optimusPromotion });
    } catch (error) {
      res.status(500).json({ success: false, message: "获取权益物料精选推广出错", error: error.message });
    }
  }

  async convertTpwdShare(req, res) {
    try {
      const { passwordContent, adzoneId } = req.body;
      const convertedLink = await tpwdShareConvertService({ password_content: passwordContent, adzone_id: adzoneId });
      res.json({ success: true, data: convertedLink });
    } catch (error) {
      res.status(500).json({ success: false, message: "淘口令解析转链出错", error: error.message });
    }
  }
}

module.exports = new PromotionController();