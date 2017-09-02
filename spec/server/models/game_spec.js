describe('Game', () => {
  const Game = require('./../../../server/models/game');
  const Player = require('./../../../server/models/player');
  const obj = {
    hostname: 'Code Miner Server',
    version: 'ioq3 1.36 linux-x86_64 Apr 12 2009'
  }
  const lines = [
    /* 0 - Game Line   */ "  0:00 InitGame: \\sv_floodProtect\\1\\sv_maxPing\\0\\sv_minPing\\0\\sv_maxRate\\10000\\sv_minRate\\0\\sv_hostname\\Code Miner Server\\g_gametype\\0\\sv_privateClients\\2\\sv_maxclients\\16\\sv_allowDownload\\0\\dmflags\\0\\fraglimit\\20\\timelimit\\15\\g_maxGameClients\\0\\capturelimit\\8\\version\\ioq3 1.36 linux-x86_64 Apr 12 2009\\protocol\\68\\mapname\\q3dm17\\gamename\\baseq3\\g_needpass\\0",
    /* 1 - Game Line   */ " 12:13 InitGame: \\sv_floodProtect\\1\\sv_maxPing\\0\\sv_minPing\\0\\sv_maxRate\\10000\\sv_minRate\\0\\sv_hostname\\Code Miner Server\\g_gametype\\0\\sv_privateClients\\2\\sv_maxclients\\16\\sv_allowDownload\\0\\bot_minplayers\\0\\dmflags\\0\\fraglimit\\20\\timelimit\\15\\g_maxGameClients\\0\\capturelimit\\8\\version\\ioq3 1.36 linux-x86_64 Apr 12 2009\\protocol\\68\\mapname\\q3dm17\\gamename\\baseq3\\g_needpass\\0",
    /* 2 - Game Line   */ "  3:32 InitGame: \\capturelimit\\8\\g_maxGameClients\\0\\timelimit\\15\\fraglimit\\20\\dmflags\\0\\bot_minplayers\\0\\sv_allowDownload\\0\\sv_maxclients\\16\\sv_privateClients\\2\\g_gametype\\0\\sv_hostname\\Code Miner Server\\sv_minRate\\0\\sv_maxRate\\10000\\sv_minPing\\0\\sv_maxPing\\0\\sv_floodProtect\\1\\version\\ioq3 1.36 linux-x86_64 Apr 12 2009\\protocol\\68\\mapname\\q3dm17\\gamename\\baseq3\\g_needpass\\0",
    /* 3 - Player Line */ " 20:34 ClientConnect: 2",
    /* 4 - Player Line */ " 20:14 ClientConnect: 3"
  ];
  var game;

  beforeEach(() => {
    game = new Game();
  });

  it('create game and read the hostname and version of server', () => {
    const g0 = new Game(lines[0]);
    const g1 = new Game(lines[1]);
    const g2 = new Game(lines[2]);
    const g3 = new Game();

    expect(g0.attributes).toEqual(obj);
    expect(g1.attributes).toEqual(obj);
    expect(g2.attributes).toEqual(obj);
    expect(g3.attributes).toEqual({});
  });

  it('add a kill in the game', () => {
    expect(game.total_kills).toEqual(0);
    game.addKill()
        .addKill()
        .addKill();
    expect(game.total_kills).toEqual(3);
  });

  it('returns object with custom informations', () => {
    player1 = new Player(lines[3]);
    player1.attributes.name = 'player 1';
    player1.addKill();
    game.addPlayer(player1).addKill().addKill().addKill();
    expect(game.toObject()).toEqual({
      total_kills: 3,
      players: ['player 1'],
      kills: {
        'player 1': 1
      }
    })
  });

  describe('Players manipulations', () => {
    var player1, player2;

    beforeEach(() => {
      player1 = new Player(lines[3]);
      player1.attributes.name = 'player 1';
      player2 = new Player(lines[4]);
      player2.attributes.name = 'player 2';
    })

    it('should be able to add a new player into game', () => {
      expect(game.players.size).toEqual(0);
      game.addPlayer(player1);
      expect(game.players.size).toEqual(1);
      game.addPlayer(player2);
      expect(game.players.size).toEqual(2);
    });

    it('not should be able to added some player with ID equals', () => {
      const somePlayerParsed = new Player(lines[3]);
      expect(game.players.size).toEqual(0);
      game.addPlayer(player1);
      expect(game.players.size).toEqual(1);
      game.addPlayer(somePlayerParsed);
      expect(game.players.size).toEqual(1);
    });

    it('retrieve a player from ID', () => {
      game.addPlayer(player1);
      expect(game.getPlayerByID(player1.get('ID'))).toEqual(player1);
    });

    it('retrieve a player not founded should return null', () => {
      game.addPlayer(player1);
      expect(game.getPlayerByID(player2.get('ID'))).toEqual(null);
    });

    it('retrieve a list of players with names', () => {
      game.addPlayer(player1)
          .addPlayer(player2);
      expect(game.playersToObject()).toEqual(['player 1', 'player 2']);
    });

    it('retrieve the killers players', () => {
      player1.addKill();
      player1.addKill();
      game.addPlayer(player1)
          .addPlayer(player2);
      expect(game.playersKillers()).toEqual({
        'player 1': 2,
        'player 2': 0
      });
    });
  });
});
