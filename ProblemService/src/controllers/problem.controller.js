const Problem = require("../models/problem.model");
const ProblemRepository = require("../repositories/problem.repository");
const ProblemService = require("../services/problem.service");
const problemRepository = new ProblemRepository(Problem);
const problemService = new ProblemService(problemRepository);
const { StatusCodes } = require("http-status-codes");

const addProblem = async (req, res, next) => {
  try {
    const newProblem = await problemService.createProblem(req.body);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successfully created a new problem",
      error: {},
      data: newProblem,
    });
  } catch (error) {
    next(error);
  }
};

async function getProblems(req, res, next) {
  try {
    const response = await problemService.getAllProblems();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully fetched all the problems",
      error: {},
      data: response,
    });
  } catch (error) {
    next(error);
  }
}

async function getProblem(req, res, next) {
  try {
    const problem = await problemService.getProblem(req.params.id);
    return res.status(StatusCodes.OK).json({
      success: true,
      error: {},
      message: "Successfully fetched a problem",
      data: problem,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { addProblem, getProblems, getProblem };
