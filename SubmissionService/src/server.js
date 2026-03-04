const fastify = require("fastify")({ logger: true });
const PORT = 3002;
fastify.get("/ping", async (req, res) => {
  return res.code(200).send({ message: "Submission service is alive" });
});
fastify.listen({ port: PORT }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server started at http://localhost:${PORT}`);
});
