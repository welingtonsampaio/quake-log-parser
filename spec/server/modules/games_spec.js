describe('ApiGame', () => {
  const Server = require('./../../../server');

  describe('list', () => {
    it('validate route exists', done => {
      expect(() => {
        Server.inject({
          method: 'GET',
          url: '/api/v1/games'
        })
        .then(response => {
          expect(response.statusCode).toEqual(200);
          done();
        });
      }).not.toThrowError();
    });

    it('count games parseds', done => {
      expect(() => {
        Server.inject({
          method: 'GET',
          url: '/api/v1/games'
        })
        .then(response => {
          expect(Object.keys(response.result).length).toBeGreaterThan(0);
          done();
        });
      }).not.toThrowError();
    });
  });

  describe('show', () => {
    it('validate route exists', done => {
      expect(() => {
        Server.inject({
          method: 'GET',
          url: '/api/v1/games/0'
        })
        .then(response => {
          expect(response.statusCode).toEqual(200);
          done();
        });
      }).not.toThrowError();
    });

    it('show the game 0', done => {
      expect(() => {
        Server.inject({
          method: 'GET',
          url: '/api/v1/games/0'
        })
        .then(response => {
          expect(response.result).toEqual({
            "hostname": "Code Miner Server",
            "version": "ioq3 1.36 linux-x86_64 Apr 12 2009",
            "total_kills": 0,
            "players": [
              "Isgalamido"
            ],
            "kills": {
              "Isgalamido": 0
            }
          });
          done();
        });
      }).not.toThrowError();
    });

    it('show one not found game, expect 404 response', done => {
      expect(() => {
        Server.inject({
          method: 'GET',
          url: '/api/v1/games/1000'
        })
        .then(response => {
          expect(response.statusCode).toEqual(404);
          expect(response.result.message).toEqual("game not found");
          done();
        });
      }).not.toThrowError();
    });
  })
});
