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
  async updateSubmission(submissionId, updatedStatus) {
    try {
      console.log("submission id ", submissionId + " status ", updatedStatus);
      const response = await this.model.findByIdAndUpdate(
        submissionId,
        { status: updatedStatus },
        { new: true },
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
module.exports = SubmissionRepository;
