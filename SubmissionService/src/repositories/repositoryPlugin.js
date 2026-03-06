const SubmissionRepository = require("./submission.repository");
const fastifyPlugin = require("fastify-plugin");
async function repositoryPlugin(fastify, options) {
  fastify.decorate("submissionRepository", new SubmissionRepository());
}

module.exports = fastifyPlugin(repositoryPlugin);
