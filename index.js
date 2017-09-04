const Server = require('./server');
const Log = require('./server/log');
Server.start((err) => {
  if (err) {
    throw err;
  }
  Log.debug(`Server running at: ${Server.info.uri}`);
});

// listen on SIGINT signal and gracefully stop the server
process.on('SIGINT', () => {
  Log.debug('stopping hapi server');

  Server.stop({ timeout: 10000 }).then((err) => {
    Log.debug('hapi server stopped');
    process.exit((err) ? 1 : 0);
  })
})
