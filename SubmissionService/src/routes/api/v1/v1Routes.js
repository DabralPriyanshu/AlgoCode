async function v1Plugin(fastify, options) {
  fastify.register(require("./test/test.routes"), { prefix: "/test" });
}
module.exports = v1Plugin;
