// 点击行为统计,关联数据库表user_action
// /src/services/statisticsService.js
const clickStatisticsQueue = require('../queues/statisticsQueue');

exports.recordClick = async function(productId, userId) {
  // 这里仅展示将任务添加到队列的逻辑
  // 具体的数据库操作逻辑需要根据数据库表结构定义
  
  if (process.env.ENABLE_STATS === 'true') {
    await clickStatisticsQueue.add({
      productId,
      userId
    });
  }
};