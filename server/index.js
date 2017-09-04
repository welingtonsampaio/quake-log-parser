const Hapi = require('hapi');
const server = new Hapi.Server();

// Parser loads
const Parser = require('./models/parser');
const parser = new Parser();
parser.fromFile(__dirname + '/../data/games.log');

server.connection({
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 3000
});

require('./routes')(server, parser);

module.exports = server;
