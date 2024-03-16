// 文件路径: /src/utils/tbkApiRequest.js
// 用于实现与淘宝客API的交互。所有来自服务层的请求都应通过这个函数进行，确保签名的恰当性和参数的正确构建。

const axios = require('axios');
const crypto = require('crypto');
const querystring = require('querystring');
const config = require('../src/config');

const tbkApiRequest = async (method, params) => {
  // 混入公共参数
  const publicParams = {
    method: method,
    app_key: config.api.key,
    session: config.api.session,
    format: 'json',
    v: '2.0',
    sign_method: 'md5',
    timestamp: new Date().toISOString(),
  };

  // 合并所有参数，并按照淘宝客API的要求进行排序
  const sortedParams = { ...publicParams, ...params };
  const sortedKeys = Object.keys(sortedParams).sort();

  // 构建用于签名的字符串
  const signString = sortedKeys.reduce(
    (acc, key) => `${acc}${key}${sortedParams[key]}`,
    ''
  );

  // 签名的格式是: MD5(secret+paramString+secret).toUpperCase()
  const md5 = crypto.createHash('md5');
  const sign = md5
    .update(config.api.secret + signString + config.api.secret)
    .digest('hex')
    .toUpperCase();

  // 添加签名到参数中
  const finalParams = { ...sortedParams, sign };

  try {
    // 发起请求
    const response = await axios({
      url: 'https://eco.taobao.com/router/rest',
      method: 'post',
      data: querystring.stringify(finalParams),
    });

    return response.data;
  } catch (error) {
    // 根据实际情况可能需要更详细的错误处理
    console.error('Error during TBK API request:', error);
    throw error;
  }
};

module.exports = tbkApiRequest;