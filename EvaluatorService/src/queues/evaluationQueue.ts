import { Queue } from "bullmq";
import redisConnection from "../config/redis.config.js";
export default new Queue("EvaluationQueue", { connection: redisConnection });
