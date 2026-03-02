import env from "dotenv";
env.config({ quiet: true });
export default {
  PORT: Number(process.env.PORT) || 3001,
};
