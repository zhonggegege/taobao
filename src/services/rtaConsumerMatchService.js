// 文件路径: /src/services/rtaConsumerMatchService.js   接口taobao.tbk.rta.consumer.match 用于发布定向活动目标。

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
 * 定向活动目标发布
 * @param {Object} options - 调用API的选项参数
 * @return {Promise<Object>} - 调用API后返回的数据或错误对象
 */
async function rtaConsumerMatch(options) {
  const params = {
    method: 'taobao.tbk.rta.consumer.match',
    app_key: APP_KEY,
    timestamp: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'),
    format: 'json',
    v: '2.0',
    sign_method: 'md5',
    // 根据API文档添加更多需要的参数...
    ...options
  };

  params.sign = generateSignature(params);

  try {
    const response = await axios.get('http://gw.api.taobao.com/router/rest', { params });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in RTA consumer match: ', error);
    throw error;
  }
}

module.exports = rtaConsumerMatch;