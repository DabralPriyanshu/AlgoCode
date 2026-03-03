import { Redis } from "ioredis";
import ENV from "./server.config.js";

const redisConfig = {
  port: ENV.REDIS_PORT,
  host: ENV.REDIS_HOST,
  maxRetriesPerRequest: null,
};
const redisConnection:any = new Redis(redisConfig);
export default redisConnection;
