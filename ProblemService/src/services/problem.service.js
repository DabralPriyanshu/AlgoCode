const sanitizeMarkdownContent = require("../utils/markdownSanitizer");

class ProblemService {
  constructor(problemRepository) {
    this.problemRepository = problemRepository;
  }
  async createProblem(problemData) {
    try {
      //sanitize markdown for description
      problemData.description = sanitizeMarkdownContent(
        problemData.description,
      );
      const problem = await this.problemRepository.createProblem(problemData);
      return problem;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getAllProblems() {
    try {
      const problems = await this.problemRepository.getAllProblems();
      return problems;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = ProblemService;
