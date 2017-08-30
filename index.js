const Server = require('./server');
const Log = require('./log');
Server.connection({ port: 3000 });
Server.start(function (err) {
  if (err) {
    throw err;
  }
  Log.debug(`Server running at: ${server.info.uri}`);
});
