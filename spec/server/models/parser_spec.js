describe('Parser', () => {
  const Parser = require('./../../../server/models/parser');
  var parser;

  beforeEach(() => {
    parser = new Parser();
  });

  it('parse lines', () => {
    jasmine.logLines.split("\n").forEach((line) => {
      try {
        parser.parseLine(line);
      }catch(e) {
        //console.log(line);
      }
    })
    expect(Object.keys(parser.toObject())).toEqual(['game_0']);
    expect(parser.toObject().game_0).toEqual(jasmine.objectContaining({
      hostname: 'Code Miner Server',
      version: 'ioq3 1.36 linux-x86_64 Apr 12 2009',
      total_kills: 4,
      players: ['Dono da Bola', 'Isgalamido', 'Zeh'],
      kills: {
        'Dono da Bola': 0,
        'Isgalamido': 1,
        'Zeh': 0
      }
    }));
  });
});
