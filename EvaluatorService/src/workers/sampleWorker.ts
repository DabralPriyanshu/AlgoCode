import { Job, Worker } from "bullmq";
import SampleJob from "../jobs/SampleJob.js";
import redisConnection from "../config/redis.config.js";

function sampleWorker(queueName: string) {
  const worker = new Worker(
    queueName,
    async (job: Job) => {
      if (job.name === "SampleJob") {
        const sampleJobInstance = new SampleJob(job.data);
        sampleJobInstance.handler(job);
        return true;
      }
    },
    { connection: redisConnection },
  );
}
export default sampleWorker;
