const logger = require("../config/logger.config");
const NotFoundError = require("../errors/NotFoundError");

class ProblemRepository {
  constructor(model) {
    this.model = model;
  }
  async createProblem(problemData) {
    try {
      const problem = await this.model.create({
        title: problemData.title,
        description: problemData.description,
        codeStubs: problemData.codeStubs,
        testCases: problemData.testCases ? problemData.testCases : [],
      });
      return problem;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllProblems() {
    try {
      const problems = await this.model.find({});
      return problems;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getProblem(id) {
    try {
      const problem = await this.model.findById(id);
      if (!problem) {
        throw new NotFoundError("Problem", id);
      }
      return problem;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteProblem(id) {
    try {
      const deletedProblem = await this.model.findByIdAndDelete(id);
      if (!deletedProblem) {
        logger.error(`Problem with ID: ${id} not found`);
        throw new NotFoundError("Problem", id);
      }
      return deletedProblem;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async updateProblem(id, data) {
    try {
      const updatedProblem = await this.model.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      if (!updatedProblem) {
        logger.error(
          `Problem.Repository: Problem with id: ${id} not found in the db`,
        );
        throw new NotFoundError("problem", id);
      }
      return updatedProblem;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = ProblemRepository;
