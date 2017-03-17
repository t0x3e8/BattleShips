/* eslint 
    func-style : ["error", "declaration"],
    no-unused-vars : ["error", { "varsIgnorePattern" : "tate$"}]
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

    var that = this;
    var state = GameState.NotStarted;
    var oldState = GameState.NotStarted;
    
    this.gameId = uuid();
    this.board = null;
    this.history = null;
    this.players = [];

    this.setState = function (newState) {
        var gameResult = 0;

        that.oldState = that.state;
        that.state = newState;

        if (that.state === GameState.Started) {
            // initialize History and Board. Let players know that turn started and wait.
            that.history = new History();
            that.history.init(that.players);
            that.board = new Board();
            that.board.init(that.players[0], that.players[1]);

            that.setState(GameState.Waiting);
        } else if (that.state === GameState.Waiting) {
            // TODO: Set timer where an email can be send to users with reminder
            that.notifyPlayers();
        } else if (that.state === GameState.Turn) {
            // Let Board to process the turn and save output in the history
            gameResult = that.board.processTurn(that.players[0], that.players[1]);
            that.history.pushTurn(that.players[0], that.players[1]);

            gameResult === 0 ? that.setState(GameState.Waiting) : that.setState(GameState.Ended);
        } else if (that.state === GameState.Ended) {
            that.history.end(gameResult);
        }
    }

    this.commitTurn = function () {
        var isTurnCommitted = that.players[0].isReady() && that.players[1].isReady();

        if (isTurnCommitted) {
            that.setState(GameState.Turn);
        }
    }
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
    
Game.prototype.notifyPlayers = function () {
    'use strict';
    var commitTurnCallback = this.commitTurn;

    this.players.forEach(function (player) {
        player.startTurn(commitTurnCallback);
    });
}

module.exports = Game;