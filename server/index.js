const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({ port: 8888 });

/**
 * Simple route to monitoring uptime of server
 */
server.route({
  method: 'GET',
  path: '/api/v1/ping',
  handler: (request, reply) => reply({ ping: 'pong' })
})

module.exports = server;
