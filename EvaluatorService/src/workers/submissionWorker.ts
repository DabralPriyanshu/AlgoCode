import { Job, Worker } from "bullmq";
import redisConnection from "../config/redis.config.js";
import SubmissionJob from "../jobs/SubmissionJob.js";

function submissionWorker(queueName: string) {
  const worker = new Worker(
    queueName,
    async (job: Job) => {
      if (job.name === "SubmissionJob") {
        const submissionJobInstance = new SubmissionJob(job.data);
        submissionJobInstance.handler(job);
        return true;
      }
    },
    { connection: redisConnection },
  );
}
export default submissionWorker;
