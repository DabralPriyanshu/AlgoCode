const { Redis } = require("ioredis");
const ENV = require("./server.config");

const redisConfig = {
  port: ENV.REDIS_PORT,
  host: ENV.REDIS_HOST,
  maxRetriesPerRequest: null,
};
const redisConnection = new Redis(redisConfig);
module.exports = redisConnection;
