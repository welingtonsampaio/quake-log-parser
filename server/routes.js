const Log = require('./log');

const ping = require('./modules/ping');
const apiGame = require('./modules/games');

const Router = (server, parser) => {
  const prefix = '/api/v1';

  [
    ['GET', '/ping', ping],
    ['GET', '/games', apiGame.list(parser)],
    ['GET', '/games/{id}', apiGame.show(parser)]
  ].forEach((item) => {
    Log.info(`Insert route: ${prefix}${item[1]}`);
    server.route({
      method: item[0],
      path: `${prefix}${item[1]}`,
      handler: item[2]
    });
  });
}

module.exports = Router;
