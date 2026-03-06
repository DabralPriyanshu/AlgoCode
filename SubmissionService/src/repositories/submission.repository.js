const Submission = require("../models/submission.model");
class SubmissionRepository {
  constructor() {
    this.model = Submission;
  }
  async createSubmission(submission) {
    try {
      const response = await this.model.create(submission);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
module.exports = SubmissionRepository;
