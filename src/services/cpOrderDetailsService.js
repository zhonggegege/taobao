// 文件路径: /src/services/cpOrderDetailsService.js 用于查询服务费订单的明细

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
 * 查询服务费订单明细
 * @param {Object} options - 请求选项，未指定则使用默认值
 * @return {Promise<Object>} - 调用API后返回的数据或错误对象
 */
async function getCpOrderDetails(options = {}) {
  const defaultOptions = {
    fields: 'tb_trade_parent_id,tb_trade_id,tk_commission_pre_fee_for_media_platform', // 查询字段，默认为必要字段
    start_time: new Date().toISOString().split('T')[0] + ' 00:00:00', // 查询开始时间，默认为当天
    end_time: new Date().toISOString().split('T')[0] + ' 23:59:59', // 查询结束时间，默认为当天
    page_no: 1, // 页数，默认为1
    page_size: 20, // 每页大小，默认为20，最大值100
    // 其他可根据需要添加的默认参数
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
    method: 'taobao.tbk.cp.order.details.get',
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
    console.error('Error getting CP order details: ', error);
    throw error;
  }
}

module.exports = getCpOrderDetails;