// 路径: /src/services/tbkService.js 基本搜索模块
// 为控制器提供了一个清晰的接口来执行业务操作。它还可以被复用于不同的控制器，以便在不同的场景中使用。

const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

// 从环境变量获取配置的API密钥和密钥
const APP_KEY = process.env.TBK_APP_KEY;      // 您在淘宝开放平台申请的 App Key
const APP_SECRET = process.env.TBK_APP_SECRET;// 您在淘宝开放平台申请的 App Secret
const ADZONE_ID = process.env.TBK_ADZONE_ID;  // 推广位ID

// 生成API签名
const generateSign = (params) => {
  params = {
    ...params,
    app_key: APP_KEY,
    timestamp: new Date().toISOString().replace(/-\d{2}T/, ' ').slice(0, -5),
    format: 'json',
    v: '2.0',
    sign_method: 'md5'
  };
  const orderedParams = Object.keys(params).sort().reduce((acc, key) => `${acc}${key}${params[key]}`, '');
  const signString = APP_SECRET + orderedParams + APP_SECRET;
  return crypto.createHash('md5').update(signString).digest('hex').toUpperCase();
};

// 搜索商品
const searchProducts = async (keywords) => {
  const queryParams = {
    method: 'taobao.tbk.dg.material.optional',
    adzone_id: ADZONE_ID,
    q: keywords,  // 搜索关键词
  };
  
  // 添加签名
  queryParams.sign = generateSign(queryParams);

  // 发起API请求
  try {
    const response = await axios.get('http://gw.api.taobao.com/router/rest', { params: queryParams });
    return response.data;
  } catch (error) {
    console.error('搜索商品失败:', error);
    throw error;
  }
};

module.exports = searchProducts;