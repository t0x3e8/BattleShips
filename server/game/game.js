/* eslint func-style : ["error", "declaration"]
*/
var uuid = require('uuid/v1');
var Board = require('./board.js');
var History = require('./history.js');

/**
 * A class representing a Game object.
 * @returns {void} 
 */
function Game() {
    'use strict'
    // var that = this;

    this.gameId = uuid();
    this.board = new Board();
    this.players = [];
    this.history = null;
}

/**
 * A method which allows to add new use to the game.
 * @param {object} player - should represent Player object
 * @return {void}
 */
Game.prototype.join = function (player) {
    'use strict'

    this.players.push(player);
}

/**
 * A method which allows to start a new game when all requirements are fullfilled. A history of the game is created.
 * @return {void}
 */
Game.prototype.start = function () {
    'use strict'

    if (this.players.length === 2) {
        this.history = new History();
    }
}

module.exports = Game;