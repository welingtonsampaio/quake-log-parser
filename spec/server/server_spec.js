describe('Server', () => {
  const Server = require('./../../server');

  it('validate connection with ping route', done => {
    var promise;
    expect(() => {
      Server.inject({
        method: 'GET',
        url: '/api/v1/ping'
      })
      .then(response => {
        expect(response.statusCode).toEqual(200);
        done();
      });
    }).not.toThrowError();
  });
});
