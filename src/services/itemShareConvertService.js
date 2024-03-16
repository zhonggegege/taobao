// 文件路径: /src/services/itemShareConvertService.js 用于转换和获取商品的三方分成链接

const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

// 从环境变量中读取淘宝客API的AppKey和AppSecret和AdzoneId
const APP_KEY = process.env.TBK_APP_KEY;
const APP_SECRET = process.env.TBK_APP_SECRET;
const ADZONE_ID = process.env.TBK_ADZONE_ID; // 推广位ID

/**
 * 使用MD5算法生成签名
 * @param {Object} params - 请求参数
 * @return {string} - 签名字符串
 */
function generateSignature(params) {
  const orderedParams = Object.keys(params).sort().map(key => `${key}${params[key]}`).join('');
  return crypto.createHash('md5').update(APP_SECRET + orderedParams + APP_SECRET, 'utf8').digest('hex').toUpperCase();
}

/**
 * 转换和获取商品的三方分成链接
 * @param {Object} options - 请求选项，未指定则使用默认值
 * @return {Promise<Object>} - 调用API后返回的数据或错误对象
 */
async function itemShareConvert(options = {}) {
  const defaultOptions = {
    num_iids: '',     // 商品ID，用逗号分割，最多支持传入40个，默认为空
    adzone_id: ADZONE_ID, // 推广位ID
    // 如果有其他默认参数，可以在这里添加
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
    method: 'taobao.tbk.item.share.convert',
    app_key: APP_KEY,
    timestamp: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'),
    format: 'json',
    v: '2.0',
    sign_method: 'md5'
  };

  finalOptions.sign = generateSignature(finalOptions); // 生成签名

  try {
    const response = await axios.get('http://gw.api.taobao.com/router/rest', { params: finalOptions });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error converting item share: ', error);
    throw error;
  }
}

module.exports = itemShareConvert;