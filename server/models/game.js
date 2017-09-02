const Base = require('./base');

//  0:00 InitGame: \sv_floodProtect\1\sv_maxPing\0\sv_minPing\0\sv_maxRate\10000\sv_minRate\0\sv_hostname\Code Miner Server\g_gametype\0\sv_privateClients\2\sv_maxclients\16\sv_allowDownload\0\dmflags\0\fraglimit\20\timelimit\15\g_maxGameClients\0\capturelimit\8\version\ioq3 1.36 linux-x86_64 Apr 12 2009\protocol\68\mapname\q3dm17\gamename\baseq3\g_needpass\0
var newGameRgx1 = /hostname\\([^\\]+)/;
var newGameMap1 = { 1: 'hostname' };
var newGameRgx2 = /version\\([^\\]+)/;
var newGameMap2 = { 1: 'version' };




class Game extends Base {
  /**
   * Initialize method
   * @param  {String} line Content from game log
   * @return {Game}
   */
  constructor (line='') {
    super();
    this.players = new Map();
    this.total_kills = 0;
    this.matchAndMap(line, newGameRgx1, newGameMap1);
    this.matchAndMap(line, newGameRgx2, newGameMap2);
  }

  /**
   * Added a new kill to the game, this is the de global killing
   * @return {Game} self-instance
   */
  addKill () {
    this.total_kills += 1;
    return this;
  }

  /**
   * Added a new player to collection of players
   * @param {Player} player
   * @return {Game}          self-instance
   */
  addPlayer (player) {
    let id = player.get('ID');
    if (!this.players.has(id)) {
      this.players.set(id, player);
    }
    return this;
  }

  /**
   * @see Base extended model
   * @overhide
   * @return {Object}
   */
  customItems () {
    return {
      total_kills: this.total_kills,
      players: this.playersToObject(),
      kills: this.playersKillers()
    }
  }

  /**
   * Retrieve a single player by ID
   * @param  {String} id
   * @return {Player|null}
   */
  getPlayerByID (id) {
    if (this.players.has(id)) {
      return this.players.get(id);
    }
    return null;
  }

  /**
   * Mapping players with total kill
   * player => number kills
   * @return {Object} Plain object with player name and kills
   */
  playersKillers () {
    let ret = {};
    this.players.forEach((item, key, mapObj) => {
      ret[item.get('name')] = item.get('kills');
    });
    return ret;
  }

  /**
   * Coverting de Map into
   * @return {[type]} [description]
   */
  playersToObject () {
    let ret = [];
    this.players.forEach((item, key, mapObj) => {
      ret.push(item.get('name'));
    });
    return ret;
  }

  /**
   * Executed from Parser object, this method create a new
   * game and add to parser collection
   * @param  {Parser} parser
   * @param  {String} line   Log line
   * @return {void}
   */
  static new (parser, line) {
    parser.addGame(new Game(line))
  }
}

module.exports = Game
