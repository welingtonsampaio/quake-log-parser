const ping = require('./modules/ping');
const apiGame = require('./modules/games');

const Router = (server) => {
  const prefix = '/api/v1';

  [
    ['GET', '/ping', ping],
    ['GET', '/games', apiGame.list],
    ['GET', '/games/{id}', apiGame.show]
  ].forEach((item) => {
    server.route({
      method: item[0],
      path: `${prefix}${item[1]}`,
      handler: item[2]
    });
  });
}

module.exports = Router;
