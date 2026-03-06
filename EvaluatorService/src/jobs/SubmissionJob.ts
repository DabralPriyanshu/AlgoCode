import type { Job } from "bullmq";
import type { IJob } from "../types/bullMqJob.js";
import type { SubmissionPayload } from "../types/submissionPayload.js";
import runJava from "../containers/javaExecutor.js";
import createExecutor from "../utils/executorFactory.js";
import { type ExecutionResponse } from "../types/codeExecutorStrategy.js";
class SubmissionJob implements IJob {
  name: string;
  payload: Record<string, SubmissionPayload>;

  constructor(payload: Record<string, SubmissionPayload>) {
    this.name = this.constructor.name; //gives classname
    this.payload = payload;
  }
  handler = async (job?: Job) => {
    console.log(this.payload);
    if (job) {
      const key: string = Object.keys(this.payload)[0]!;
      const language: string = this.payload[key]!.language;
      const code = this.payload[key]!.code;
      const inputTestCase = this.payload[key]!.inputCase;
      const strategy = createExecutor(language);
      if (strategy != null) {
        const response: ExecutionResponse = await strategy.execute(
          code,
          inputTestCase,
        );
        if (response.status == "Completed") {
          console.log("Code executed successfully");
          console.log(response);
        } else {
          console.log("Something went wrong with executing code");
          console.log(response);
        }
      }
    }
  };

  failed = (job?: Job) => {
    console.log("Job failed", job?.id);
  };
}
export default SubmissionJob;
