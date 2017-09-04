const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({ port: 8888 });

require('./routes')(server)

module.exports = server;
