import { Redis } from "ioredis";
import ENV from "./server.config.js";

const redisConfig = {
  port: ENV.REDIS_PORT,
  host: ENV.REDIS_HOST,
  maxRetriesPerRequest: null,
};
const redisConnection = new Redis(redisConfig);
export default redisConnection;
