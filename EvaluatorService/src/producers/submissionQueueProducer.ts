import SubmissionQueue from "../queues/submissionQueue.js";

async function addJobToSubmissionQueue(
  payload: Record<string, unknown>,
) {
  await SubmissionQueue.add("SubmissionJob",payload);
  console.log("Successfully added new submission job");
}
export default addJobToSubmissionQueue;
