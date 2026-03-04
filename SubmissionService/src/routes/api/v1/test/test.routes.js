const testController = require("../../../../controllers/test.controller");
async function testRoute(fastify, options) {
  fastify.get("/ping", testController.pingCheck);
}

module.exports = testRoute;
