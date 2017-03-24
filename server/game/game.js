/* eslint 
    func-style : ["error", "declaration"],
    no-unused-vars : ["error", { "varsIgnorePattern" : "tate$"}]
*/
/* global Reflect */
var EventEmitter = require('events').EventEmitter;
var util = require('util');
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
    var gameId = uuid();
    var gameResult = 0;

    this.board = null;
    this.history = null;
    this.players = [];

    Reflect.apply(EventEmitter, this, [])

    this.setState = function (newState) {
        oldState = state;
        state = newState;

        if (state === GameState.Started) {
            // initialize History and Board. Let players know that turn started and wait.
            that.history = new History();
            that.history.pushTurn(that.players[0], that.players[1]);
            that.board = new Board();
            that.board.init(that.players[0], that.players[1]);

            that.setState(GameState.Waiting);
            that.emit('gameStarted');
        } else if (state === GameState.Waiting) {
            // TODO: Set timer where an email can be send to users with reminder
            that.notifyPlayers();
            that.emit('gameAwaiting');
        } else if (state === GameState.Turn) {
            that.emit('gameTurnProcessing');
            // Let Board to process the turn and save output in the history
            that.history.pushTurn(that.players[0], that.players[1]);

            gameResult = that.board.processTurn(that.players[0], that.players[1]);
            gameResult === 0 ? that.setState(GameState.Waiting) : that.setState(GameState.Ended, gameResult);
            that.emit('gameTurnProcessed')
        } else if (state === GameState.Ended) {
            that.history.end(gameResult,
                gameResult === 1 ? that.players[0].getPlayerId() : that.players[1].getPlayerId()
            );
            that.emit('gameEnded');
        }
    };

    this.commitTurn = function () {
        var isTurnCommitted = that.players[0].isReady() && that.players[1].isReady();

        if (isTurnCommitted) {
            that.setState(GameState.Turn);
        }
    };

    this.getGameId = function () {
        return gameId;
    };

    this.getState = function () {
        return state;
    }
}

util.inherits(Game, EventEmitter);


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
Game.prototype.start = function () {
    'use strict'

    if (this.players.length === 2) {
        this.setState(GameState.Started);
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