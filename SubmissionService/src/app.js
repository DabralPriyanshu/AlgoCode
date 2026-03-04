const fastifyPlugin = require("fastify-plugin");
const servicePlugin = require("./services/servicePlugin");

/**
 * 
 * @param {Fastify object} fastify 
 * @param {*} options 
 @description this method will add all the required plugins
 */
async function app(fastify, options) {
  //register service
  fastify.register(servicePlugin);
  //register cors
  fastify.register(require("@fastify/cors"));

  //register test routes
  fastify.register(require("./routes/api/api.routes"), { prefix: "/api" });
}
module.exports = fastifyPlugin(app);
