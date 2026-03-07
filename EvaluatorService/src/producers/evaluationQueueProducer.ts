import EvaluationQueue from "../queues/evaluationQueue.js"

async function addJobToEvaluationQueue(
  payload: Record<string, unknown>,
) {
  await EvaluationQueue.add("EvaluationJob",payload);
  console.log("Successfully added new evaluation job");
}
export default addJobToEvaluationQueue;
