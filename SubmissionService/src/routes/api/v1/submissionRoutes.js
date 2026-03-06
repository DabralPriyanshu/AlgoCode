const submissionController = require("../../../controllers/submissionController");

async function submissionRoutes(fastify, options) {
  fastify.post("/", submissionController.createSubmission);
}
module.exports = submissionRoutes;
