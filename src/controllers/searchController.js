// 控制器文件路径: /src/controllers/searchController.js 
// 淘宝客物料搜索控制器，从请求的查询参数中提取了必要的信息，并调用了服务层的searchMaterials函数，然后将结果返回给前端。

const searchService = require('../services/searchService');

// 处理物料搜索请求的控制器函数
exports.searchMaterials = async (req, res) => {
  try {
    const { query, sort, page = 1, pageSize = 20 } = req.query;
    const adzoneId = req.query.adzoneId || process.env.TBK_ADZONE_ID; //从查询参数或环境变量中获取推广位ID

    // 调用服务层进行搜索
    const materials = await searchService.searchMaterials({
      keywords: query,
      sort,
      page,
      pageSize,
      adzoneId,
    });

    // 成功响应
    res.status(200).json({
      success: true,
      data: materials,
      message: 'Materials retrieved successfully',
    });
  } catch (error) {
    // 错误响应
    res.status(500).json({
      success: false,
      message: error.message || 'Error occurred while searching for materials',
    });
  }
};