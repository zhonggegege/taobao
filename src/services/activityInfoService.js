// 文件路径: /src/services/activityInfoService.js 获取官方活动推广链接的服务模块

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
  // 把参数按照参数名的字母顺序排序
  const orderedParams = Object.keys(params).sort().map(key => `${key}${params[key]}`).join('');
  // 在字符串前后添加AppSecret进行MD5加密生成签名，转大写
  return crypto.createHash('md5').update(APP_SECRET + orderedParams + APP_SECRET, 'utf8').digest('hex').toUpperCase();
}

/**
 * 获取官方活动推广链接
 * @param {string} activityMaterialId - 官方活动物料Id
 * @param {string} adZoneId - 推广位id
 * @return {Promise<Object>} - 调用API后返回的数据或错误对象
 */
async function getActivityInfo(activityMaterialId, adZoneId) {
  // 设置API公共和私有参数
  const params = {
    method: 'taobao.tbk.activity.info.get',
    app_key: APP_KEY,
    timestamp: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'),
    format: 'json',
    v: '2.0',
    sign_method: 'md5',
    adzone_id: adZoneId,
    activity_material_id: activityMaterialId,
  };

  // 添加签名
  params.sign = generateSignature(params);

  // 发送GET请求到淘宝客API
  try {
    const response = await axios.get('http://gw.api.taobao.com/router/rest', { params });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting activity info: ', error);
    throw error;
  }
}

module.exports = getActivityInfo;