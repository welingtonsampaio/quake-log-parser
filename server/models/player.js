const Base = require('./base');
const Log = require('./../log');

//                  20:34 ClientConnect: 2
var newPlayerRgx = /\s*\S+ ClientConnect: (\d+)/;
var newPlayerMap = { 1: 'ID'};


class Player extends Base {
  /**
   * Initialize method
   * @param  {String} line Content from game log
   * @return {Game}
   */
  constructor (line) {
    super();
    this.attributes.name = '';
    this.attributes.kills = 0;
    this.matchAndMap(line, newPlayerRgx, newPlayerMap)
  }

  addKill () {
    this.attributes.kills += 1;
    return this;
  }
}

module.exports = Player
