import express from "express";
import pingRoutes from "./ping.routes.js";
import submissionRoutes from "./submission.routes.js";
const v1Router = express.Router();

v1Router.use("/ping", pingRoutes);
v1Router.use("/submissions", submissionRoutes);

export default v1Router;
