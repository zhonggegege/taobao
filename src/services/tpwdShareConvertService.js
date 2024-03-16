// 文件路径: /src/services/tpwdShareConvertService.js 用于解析淘口令并进行三方分成转链

const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

// 从环境变量中读取淘宝客API的AppKey和AppSecret
const APP_KEY = process.env.TBK_APP_KEY;
const APP_SECRET = process.env.TBK_APP_SECRET;

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
 * 解析淘口令并进行三方分成转链
 * @param {Object} options - 请求选项，未指定则使用默认值
 * @return {Promise<Object>} - 调用API后返回的数据或错误对象
 */
async function tpwdShareConvert(options = {}) {
  const defaultOptions = {
    password_content: '', // 淘口令内容，必填参数
    adzone_id: '', // 推广位ID，必填参数
    // 其他默认参数如特殊需求等可以在这里设置
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
    method: 'taobao.tbk.tpwd.share.convert',
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
    console.error('Error converting tpwd share: ', error);
    throw error;
  }
}

module.exports = tpwdShareConvert;