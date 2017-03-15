/* eslint func-style : ["error", "declaration"]
*/
var uuid = require('uuid/v1');
var Board = require('./board.js');
var History = require('./history.js');
var GameState = {
    NotStarted: 0,
    Started: 1,
    Waiting: 2,
    Turn: 3,
    Ended: 4
}




/**
 * A class representing a Game object.
 * @returns {void} 
 */
function Game() {
    'use strict'
    // var that = this;

    this.gameId = uuid();
    this.board = null;
    this.history = null;
    this.players = [];

    this.state = GameState.NotStarted;
    this.oldState = GameState.NotStarted;
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
 * @param {function} exec - callback function when game is started
 * @return {void}
 */
Game.prototype.start = function (exec) {
    'use strict'

    if (this.players.length === 2) {
        this.setState(GameState.Started);

        if (exec) {
            exec();
        }
    }
}

Game.prototype.setState = function (newState) {
    'use strict';
    var gameResult = 0;

    this.oldState = this.state;
    this.state = newState;

    if (this.state === GameState.Started) {
        // initialize History and Board. Let players know that turn started and wait.
        this.history = new History();
        this.history.init(this.players);
        this.board = new Board();
        this.board.init(this.players[0], this.players[1]);

        this.setState(GameState.Waiting);
    } else if (this.state === GameState.Waiting) {
        // TODO: Set timer where an email can be send to users with reminder
        this.notifyPlayers();
    } else if (this.state === GameState.Turn) {
        // Let Board to process the turn and save output in the history
        gameResult = this.board.processTurn(this.players[0], this.players[1]);
        this.history.pushTurn(this.players[0], this.players[1]);

        gameResult === 0 ? this.setState(GameState.Waiting) : this.setState(GameState.Ended);
    } else if (this.state === GameState.Ended) {
        this.history.end(gameResult);
    }
}

Game.prototype.notifyPlayers = function () {
    'use strict';
    var commitTurnCallback = this.commitTurn;

    this.players.forEach(function (player) {
        player.startTurn(commitTurnCallback);
    });
}

Game.prototype.commitTurn = function () {
    'use strict';
    var that = this;

    var nested = function () {
        var isTurnCommitted = that.players[0].isReady() && that.players[1].isReady();

        if (isTurnCommitted) {
            that.setState(GameState.Turn);
        }
    }

    return nested();
}

module.exports = Game;