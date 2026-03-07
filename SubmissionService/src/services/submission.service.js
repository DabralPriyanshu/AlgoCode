const fetchProblemDetails = require("../apis/problem");
const addJobToSubmissionQueue = require("../producers/submissionQueueProducer");
const NotFoundError = require("../errors/NotFoundError");
class SubmissionService {
  constructor(submissionRepository) {
    this.submissionRepository = submissionRepository;
  }
  async addSubmission(submissionPayload) {
   const userId=submissionPayload.userId
    const problemId = submissionPayload.problemId;
    const apiResponse = await fetchProblemDetails(problemId);
    if (!apiResponse) {
      throw new NotFoundError("Problem", problemId);
    }
    // console.log(apiResponse.codeStubs);
    const languageCodeStub = apiResponse.codeStubs.find(
      (codeStub) =>
        codeStub.language.toLowerCase() ==
        submissionPayload.language.toLowerCase(),
    );
    console.log(languageCodeStub);
    submissionPayload.code =
      languageCodeStub.startSnippet +
      "\n\n" +
      submissionPayload.code +
      "\n\n" +
      languageCodeStub.endSnippet;
    // now creating a submission

    const submission =
      await this.submissionRepository.createSubmission(submissionPayload);
    if (!submission) {
      throw { message: "Not able to create submission" };
    }
    console.log(submission);
    const response = await addJobToSubmissionQueue({
      [submission._id]: {
        code: submission.code,
        language: submission.language,
        inputCase: apiResponse.testCases[0].input,
        outputCase: apiResponse.testCases[0].output,
        userId,
        submissionId:submission._id
      },
    });
    return { queueResponse: response, submission };
  }
}

module.exports = SubmissionService;
