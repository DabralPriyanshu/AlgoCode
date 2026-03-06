const fastifyPlugin = require("fastify-plugin");
const servicePlugin = require("./services/servicePlugin");
const repositoryPlugin = require("./repositories/repositoryPlugin");

/**
 * 
 * @param {Fastify object} fastify 
 * @param {*} options 
 @description this method will add all the required plugins
 */
async function app(fastify, options) {
  // register repository plugin
  await fastify.register(repositoryPlugin);
  //register service
  await fastify.register(servicePlugin);
  //register cors
  await fastify.register(require("@fastify/cors"));

  //register test routes
  await fastify.register(require("./routes/api/api.routes"), {
    prefix: "/api",
  });
}
module.exports = fastifyPlugin(app);
