const { Worker } = require("bullmq");
const redisConnection = require("../config/redis.config");
const axios = require("axios");

function evaluationWorker(queueName) {
  new Worker(
    queueName,
    async (job) => {
      if (job.name === "EvaluationJob") {
        console.log(job.data);
        const response = await axios.post("http://localhost:3003/sendPayload", {
          userId: job.data.userId,
          payload: job.data,
        });
        console.log(response);
      }
    },
    { connection: redisConnection },
  );
}

module.exports = evaluationWorker;
