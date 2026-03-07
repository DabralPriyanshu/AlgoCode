const fastify = require("fastify")({ logger: true });
const { PORT } = require("./config/server.config");
const app = require("./app");
const connectToDB = require("./config/db.config");
const errorHandler = require("./utils/errorHandler");
const evaluationWorker = require("./workers/evaluationWorker");

fastify.register(app);
fastify.get("/ping", async (req, res) => {
  return res.code(200).send({ message: "Submission service is alive" });
});
fastify.setErrorHandler(errorHandler);
fastify.listen({ port: PORT }, async (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  await connectToDB();
  evaluationWorker("EvaluationQueue");
  console.log(`Server started at http://localhost:${PORT}`);
});
