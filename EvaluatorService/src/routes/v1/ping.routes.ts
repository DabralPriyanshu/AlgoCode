import express from "express";
import pingController from "../../controllers/ping.controller.js";
const pingRouter = express.Router();

pingRouter.get("/", pingController.pingCheck);

export default pingRouter;
