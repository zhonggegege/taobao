// 服务层文件路径: /src/services/searchService.js

const tbkApiRequest = require('../utils/tbkApiRequest');

exports.searchMaterials = async ({ keywords, sort, page, pageSize, adzoneId }) => {
  try {
    // API方法名称
    const method = 'taobao.tbk.dg.material.optional';
    
    // 构建搜索API所需的参数
    const params = {
      q: keywords,
      sort: sort,
      start_row: (page - 1) * pageSize,
      page_size: pageSize,
      adzone_id: adzoneId // 推广位ID, 需要在环境变量中配置或通过其他方式获取
    };

    // 使用tbkApiRequest工具函数发起API请求
    const response = await tbkApiRequest(method, params);

    // 检查响应中是否有错误信息
    if (response && response.error_response) {
      throw new Error(response.error_response.sub_msg || 'Unknown error from TBK API');
    }

    // 提取并返回搜索结果
    return response.result_list ? response.result_list.map_item : [];
  } catch (error) {
    console.error('Error searching TBK materials:', error);
    throw error; // 异常情况应向上抛出，由控制器统一处理
  }
};