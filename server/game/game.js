/* eslint func-style : ["error", "declaration"]
*/
var uuid = require('uuid/v1');
var Board = require('./board.js');

/**
 * A class representing a Game object.
 * @returns {void} 
 */
function Game () {
    'use strict'
    // var that = this;

    this.gameId = uuid();
    this.board = new Board();
}


module.exports = Game;