const lineReader = require('line-reader');

const Game = require('./game');
const Player = require('./player');

const models = {
  'InitGame:': Game.new,
  'ClientConnect:': Player.new,
  'ClientUserinfoChanged:': Player.update,
  'Kill:': Player.kill
}

class Parser {
  constructor () {
    /**
     * Collect of games parseds
     * @type {Map}
     */
    this.gameCollection = new Map();

    /**
     * Define the current game number parsed
     * @type {Number}
     */
    this.currentGame = 0;
  }

  /**
   * Added a new game in collection
   * @param  {Game}   game The model object
   * @return {Parser}      self-instance
   */
  addGame (game) {
    this.currentGame++;
    this.gameCollection.set(this.currentGame.toString(), game);
    return this;
  }

  /**
   * TODO: create doc
   * @param  {String} file Relative or absolute filename
   * @return {Promise}
   */
  fromFile (file) {
    // read all lines:
    return new Promise((resolve, reject) =>{
      lineReader.eachLine(file, (line, last) => {
        this.parseLine(line);
      });
    });
  }

  /**
   * Retrieve the current game from number
   * @return {Game}
   */
  getCurrentGame () {
    return this.gameCollection.get(this.currentGame.toString());
  }

  /**
   * Checks that the row corresponds to a model
   * @param  {String} line line of game log
   * @return {void}
   */
  parseLine (line) {
    Object.keys(models).forEach((item) => {
      if (line.indexOf(item) === 7) {
        models[item](this, line);
      }
    });
  }

  toObject () {
    let ret = {};
    this.gameCollection.forEach((item, idx) => {
      ret[`game_${parseInt(idx) - 1}`] = item.toObject();
    });
    return ret;
  }
}

module.exports = Parser
