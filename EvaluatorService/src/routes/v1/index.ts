import express from "express";
import pingRoutes from "./ping.routes.js";
const v1Router = express.Router();

v1Router.use("/ping", pingRoutes);

export default v1Router;
