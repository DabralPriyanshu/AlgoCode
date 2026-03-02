import express, { type Express } from "express";
import ENV from "./config/server.config.js";
import apiRoutes from "./routes/index.js";
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);
app.listen(ENV.PORT, () => {
  console.log(`Server started at http://localhost:${ENV.PORT}`);
});
