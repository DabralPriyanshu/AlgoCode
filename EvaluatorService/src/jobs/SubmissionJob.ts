import type { Job } from "bullmq";
import type { IJob } from "../types/bullMqJob.js";
import type { SubmissionPayload } from "../types/submissionPayload.js";
import runJava from "../containers/runJavaDocker.js";

class SubmissionJob implements IJob {
  name: string;
  payload: Record<string, SubmissionPayload>;

  constructor(payload: Record<string, SubmissionPayload>) {
    this.name = this.constructor.name; //gives classname
    this.payload = payload;
  }
  handler = async (job?: Job) => {
    // console.log("Handler of job called");
    console.log(this.payload);
    if (job) {
      //   console.log(this.payload["1234"].language);
      const key: string = Object.keys(this.payload)[0]!;
      const language: string = this.payload[key]!.language;
      if (language === "JAVA") {
        const response = await runJava(
          this.payload[key]?.code!,
          this.payload[key]?.inputCase!,
        );
        console.log("Evaluated response is ", response);
      }
    }
  };

  failed = (job?: Job) => {
    console.log("Job failed", job?.id);
  };
}
export default SubmissionJob;
