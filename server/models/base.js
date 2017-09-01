class Base {

  constructor () {
    /**
     * Content showing when formatted with json
     * @type {Object}
     */
    this.attributes = this.attributes || {}
  }

  /**
   * Customized items, used to export object to others formats
   * @return {Object} Empty object, it should overhide in child model
   */
  customItems () {
    return {}
  }

  /**
   * Generic capture especif attribute by name
   * @param  {String} name Attribute name
   * @return {Mixin}
   */
  get (name) {
    if (this.attributes.hasOwnProperty(name)) return this.attributes[name];
    return null;
  }

  /**
   * Execute regex into string, if returns a valid
   * match, populate attributes with the values
   *
   * @param {String} line   Content to scan
   * @param {Regex}  regex  Regex to analisys line
   * @param {Array}  map    Mapping match groups to attributes data
   * @return {Base}         self-instance
   */
  matchAndMap(line, regex, map) {
    let matches = line.match(regex)
        , ret = {};

    if (!!matches) {
      for (var k in map) {
          if (typeof matches[k] === 'string' && matches[k].length > 0) {
            ret[map[k]] = matches[k];
          }
      }

      this.attributes = Object.assign({}, this.attributes, ret);
    }

    return this
  }


  /**
   * Generate a plain Object with attributes
   * @return {Object}
   */
  toObject () {
    return Object.assign({}, this.attributes, this.customItems());
  }
}

module.exports = Base
