const express = require("express");
const problemController = require("../../controllers/problem.controller");
const problemRouter = express.Router();

problemRouter.post("/", problemController.addProblem);

module.exports = problemRouter;
