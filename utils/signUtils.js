// 文件路径：/src/utils/signUtils.js 签名逻辑
const crypto = require('crypto');
require('dotenv').config();

/**
 * 使用MD5算法生成签名
 * @param {Object} params - 请求参数
 * @return {string} - 签名字符串
 */
exports.generateSignature = (params) => {
  const { APP_SECRET } = process.env; // 从.env文件读取APP_SECRET
  const orderedParams = Object.keys(params).sort().map(key => `${key}${params[key]}`).join('');
  return crypto.createHash('md5').update(APP_SECRET + orderedParams + APP_SECRET, 'utf8').digest('hex').toUpperCase();
};