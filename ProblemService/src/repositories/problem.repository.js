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

  async getProblem(problemId) {
    try {
      const problem = await this.model.findById(problemId);
      if (!problem) {
        throw new NotFoundError("Problem", id);
      }
      return problem;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
module.exports = ProblemRepository;
