const { Queue } = require("bullmq");
const redisConnection = require("../config/redis.config");
module.exports = new Queue("SubmissionQueue", {
  connection: redisConnection,
});
