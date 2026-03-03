import type { Job } from "bullmq";
import type { IJob } from "../types/bullMqJob.js";

class SampleJob implements IJob {
  name: string;
  payload: Record<string, unknown>;

  constructor(payload: Record<string, unknown>) {
    this.name = this.constructor.name; //gives classname
    this.payload = payload;
  }
  handler = (job?: Job) => {
    // console.log("Handler of job called");
    if (job) {
      console.log(job.name, job.id, job.data);
    }
  };

  failed = (job?: Job) => {
    console.log("Job failed", job?.id);
  };
}
export default SampleJob;
