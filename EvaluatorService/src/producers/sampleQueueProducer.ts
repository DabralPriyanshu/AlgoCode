import SampleQueue from "../queues/sampleQueue.js";

async function addJobToSampleQueue(
  name: string,
  payload: Record<string, unknown>,
) {
  await SampleQueue.add(name, payload);
  console.log("Successfully added new job");
}
export default addJobToSampleQueue;
