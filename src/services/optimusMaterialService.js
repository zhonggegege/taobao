// 文件路径: /src/services/optimusMaterialService.js 提供物料精选的功能模块

const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

// 从环境变量中读取淘宝客API的AppKey和AppSecret和AdzoneId
const APP_KEY = process.env.TBK_APP_KEY;
const APP_SECRET = process.env.TBK_APP_SECRET;
const ADZONE_ID = process.env.TBK_ADZONE_ID;  // 推广位ID

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
 * 获取系统优选的物料精选推广，参数可从外部传入，若未传则使用默认值
 * @param {Object} options - 物料请求选项，未指定则使用默认值
 * @return {Promise<Object>} - 调用API后返回的数据或错误对象
 */
async function optimusMaterial(options = {}) {
  const defaultOptions = {
    material_id: '',    // 物料ID，默认为空，需要指定
    page_no: 1,         // 结果页码，默认为1
    page_size: 20,      // 每页结果数，默认为20
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
    method: 'taobao.tbk.dg.optimus.material',
    app_key: APP_KEY,
    timestamp: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'),
    format: 'json',
    v: '2.0',
    sign_method: 'md5',
    adzone_id: ADZONE_ID, // 推广位ID
  };

  finalOptions.sign = generateSignature(finalOptions); // 生成签名

  try {
    const response = await axios.get('http://gw.api.taobao.com/router/rest', { params: finalOptions });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting optimus material: ', error);
    throw error;
  }
}

module.exports = optimusMaterial;