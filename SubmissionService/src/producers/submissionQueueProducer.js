const SubmissionQueue = require("../queues/submissionQueue");
async function addJobToSubmissionQueue(payload) {
  await SubmissionQueue.add("SubmissionJob", payload);
  console.log("Successfully added new submission job");
}
module.exports = addJobToSubmissionQueue;
