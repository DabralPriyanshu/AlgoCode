import express, { type Express } from "express";
import ENV from "./config/server.config.js";
const app: Express = express();
app.listen(ENV.PORT, () => {
  console.log(`Server started at http://localhost:${ENV.PORT}`);
});
