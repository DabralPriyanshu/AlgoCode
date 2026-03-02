import env from "dotenv";
env.config({ quiet: true });
export default {
  PORT: Number(process.env.PORT) || 3001,
  REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
};
