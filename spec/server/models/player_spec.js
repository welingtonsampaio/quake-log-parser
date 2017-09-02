describe('Player', () => {
  const Player = require('./../../../server/models/player');
  const lines = [
    /* 0 - Player Line */ " 20:34 ClientConnect: 2",
    /* 1 - Player Line */ " 20:14 ClientConnect: 3",
    /* 2 - Data Line   */ " 21:15 ClientUserinfoChanged: 2 n\\Isgalamido\\t\\0\\model\\uriel/zael\\hmodel\\uriel/zael\\g_redteam\\\\g_blueteam\\\\c1\\5\\c2\\5\\hc\\100\\w\\0\\l\\0\\tt\\0\\tl\\0",
    /* 3 - Data Line   */ "  3:47 ClientUserinfoChanged: 3 n\\Assasinu Credi\\t\\0\\model\\sarge\\hmodel\\sarge\\g_redteam\\\\g_blueteam\\\\c1\\4\\c2\\5\\hc\\95\\w\\0\\l\\0\\tt\\0\\tl\\0",
    /* 4 - Kill Line   */ "  3:32 Kill: 2 3 6: Isgalamido killed Assasinu Credi by MOD_ROCKET",
    /* 5 - Kill Line   */ "  3:32 Kill: 2 3 6: Isgalamido killed Assasinu Credi by MOD_ROCKET",
    /* 6 - Kill Line   */ "  3:32 Kill: 3 2 6: Assasinu Credi killed Isgalamido by MOD_ROCKET"
  ];
  var player;

  beforeEach(() => {
    player = new Player(lines[0]);
  });

  it('create a new player with id parsed', () => {
    const p1 = new Player(lines[0]);
    const p2 = new Player(lines[1]);
    expect(p1.get('ID')).toEqual('2');
    expect(p2.get('ID')).toEqual('3');
  });

  it('parser player info with data from log', () => {
    player.updateFromParser(lines[2]);
    expect(player.get('name')).toEqual('Isgalamido');
  });
});
