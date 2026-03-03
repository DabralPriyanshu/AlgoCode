import SampleQueue from "../queues/sampleQueue.js";

async function addJobToSampleQueue(
  name: string,
  payload: Record<string, unknown>,
  priority: number,
) {
  await SampleQueue.add(name, payload, { priority: priority });
  console.log("Successfully added new job");
}
export default addJobToSampleQueue;
