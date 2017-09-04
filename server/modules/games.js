class Game {
  /**
   * Show all games parsed from log
   */
  list (parser){
    return (request, reply) => {
      reply(parser.toObject());
    }
  }

  /**
   * Expose one game and print your date
   */
  show (parser) {
    return (request, reply) => {
      let id = parseInt(request.params.id) + 1;
      let game = parser.gameCollection.get(id.toString());
      if (game) {
        reply(game.toObject());
      } else {
        reply({message: 'game not found'}).code(404);
      }
    }
  }
}

const game = new Game();
module.exports = game;
