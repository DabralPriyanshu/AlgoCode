const { Worker } = require("bullmq");
const redisConnection = require("../config/redis.config");
const axios = require("axios");
const SubmissionRepository = require("../repositories/submission.repository");
const submissionRepository = new SubmissionRepository();
function evaluationWorker(queueName) {
  new Worker(
    queueName,
    async (job) => {
      if (job.name === "EvaluationJob") {
        console.log("printing job data ", job.data);
        console.log("printing job data ", job.data.response.status);
        console.log("Submission repo->", submissionRepository);
        try {
          const res = await submissionRepository.updateSubmission(
            job.data.submissionId,
            job.data.response.status,
          );
          console.log("Response from db", res);
          const response = await axios.post(
            "http://localhost:3003/sendPayload",
            {
              userId: job.data.userId,
              payload: job.data,
            },
          );
          console.log(response);
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    },
    { connection: redisConnection },
  );
}

module.exports = evaluationWorker;
