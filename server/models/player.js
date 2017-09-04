const Base = require('./base');
const Log = require('./../log');

//                  20:34 ClientConnect: 2
var newPlayerRgx = /\s*\S+ ClientConnect: (\d+)/;
var newPlayerMap = { 1: 'ID'};

//                 21:15 ClientUserinfoChanged: 2 n\Isgalamido\t\0\model\uriel/zael\hmodel\uriel/zael\g_redteam\\g_blueteam\\c1\5\c2\5\hc\100\w\0\l\0\tt\0\tl\0
var updatePlayerRgx = /\s*\S+ ClientUserinfoChanged: (\d+) n\\([^\\]+)/;
var updatePlayerMap = {
  1: 'ID',
  2: 'name'
};


//   2:22 Kill: 3 2 10: Isgalamido killed Dono da Bola by MOD_RAILGUN
//   2:04 Kill: 1022 2 19: <world> killed Dono da Bola by MOD_FALLING
var killerRgx = /\s*\S+ Kill: (\d+) (\d+)/;
var killerMap = {
  1: 'killer',
  2: 'loser'
};


class Player extends Base {
  /**
   * Initialize method
   * @param  {String} line Content from game log
   * @return {Game}
   */
  constructor (line='') {
    super();
    this.attributes.name = '';
    this.attributes.kills = 0;
    this.matchAndMap(line, newPlayerRgx, newPlayerMap)
  }

  /**
   * Added a new kill to this player
   * @return {Player} self-instance
   */
  addKill () {
    this.attributes.kills += 1;
    return this;
  }

  /**
   * Update player info from line parsed
   * @param  {String} line [description]
   * @return {[type]}      [description]
   */
  updateFromParser (line) {
    this.matchAndMap(line, updatePlayerRgx, updatePlayerMap)
  }

  /**
   * Executed from Parser object, this method create a new
   * player and add into current game
   * @param  {Parser} parser
   * @param  {String} line   Content of game log
   * @return {void}
   */
  static new (parser, line) {
    parser.getCurrentGame().addPlayer(new Player(line));
  }

  /**
   * Executed from Parser object, this method create a new
   * player and add into current game
   * @param  {Parser} parser
   * @param  {String} line   Content of game log
   * @return {void}
   */
  static update (parser, line) {
    let matches = line.match(updatePlayerRgx);
    if (!!matches) {
      let player = parser.getCurrentGame().getPlayerByID(matches[1]);

      if (player !== null) {
        player.updateFromParser(line)
      } else {
        Log.warn('Player not found into game: ' + matches[1]);
      }
    } else {
      Log.warn('Line invalid to regex: ' + line);
    }
  }

  /**
   * Executed from parse, when one killin is executed
   * @param  {Parser}  parser
   * @param  {[String} line
   * @return {void}
   */
  static kill (parser, line) {
    let matches = line.match(killerRgx);
    let game = parser.getCurrentGame();
    game.addKill();
    if (line.indexOf('<world>') === -1) {
      let player = game.getPlayerByID(matches[1]);
      player.addKill();
    }
  }
}

module.exports = Player
