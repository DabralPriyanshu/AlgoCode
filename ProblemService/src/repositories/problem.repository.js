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
}
module.exports = ProblemRepository;
