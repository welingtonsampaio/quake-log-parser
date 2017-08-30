describe('Log', () => {
  const Log = require('./../../server/log');

  it('simple print', () => {
    spyOn(console, 'log');
    Log.print('message');
    expect(console.log).toHaveBeenCalledWith('message');
  });

  describe('With log level', () => {
    beforeEach(() => {
      spyOn(Log, 'print');
    });

    it('prefix of debug level', () => {
      Log.debug('message');
      expect(Log.print).toHaveBeenCalledWith('[D] - message');
    });

    it('prefix of Error level', () => {
      Log.error('message');
      expect(Log.print).toHaveBeenCalledWith('[E] - message');
    });

    it('prefix of Info level', () => {
      Log.info('message');
      expect(Log.print).toHaveBeenCalledWith('[I] - message');
    });

    it('prefix of Warn level', () => {
      Log.warn('message');
      expect(Log.print).toHaveBeenCalledWith('[W] - message');
    });
  });
});
