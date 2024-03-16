// /src/queues/statisticsQueue.js
// 用于异步执行统计任务的队列

const Queue = require('bull');
const statisticsService = require('../services/statisticsService');

// 配置连接到Redis的队列
const statisticsQueue = new Queue('statistics', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
  },
});

// 统计队列的处理逻辑
statisticsQueue.process(async (job, done) => {
  try {
    await statisticsService.recordClick(job.data);
    done();
  } catch (error) {
    done(new Error(`Failed to process statistics job: ${error.message}`));
  }
});

// 一个方法，用于启动队列的处理逻辑
exports.startProcessing = () => {
  console.log('Statistics queue processing has started...');
};

module.exports = statisticsQueue;