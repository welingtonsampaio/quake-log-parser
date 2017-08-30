/**
 * The simple log system
 */
class LogSystem {

  constructor() {
    this.enabled = true
  }

  /**
   * Print message in console with DEBUG level
   * @param  {string} message
   * @return {void}
   */
  debug(message) {
    this.print(`[D] - ${message}`);
  }

  /**
   * Print message in console with ERROR level
   * @param  {string} message
   * @return {void}
   */
  error(message) {
    this.print(`[E] - ${message}`);
  }

  /**
   * Print message in console with INFO level
   * @param  {string} message
   * @return {void}
   */
  info(message) {
    this.print(`[I] - ${message}`);
  }

  /**
   * Print message in console with WARN level
   * @param  {string} message
   * @return {void}
   */
  warn(message) {
    this.print(`[W] - ${message}`);
  }

  /**
   * Print in console anything message if the system is enabled
   * @param  {string} message
   * @return {void}
   */
  print(message) {
    if (this.enabled) {
      console.log(message);
    }
  }
}

module.exports = new LogSystem()
