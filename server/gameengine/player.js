/* eslint func-style : ["error", "declaration"]
*/
var uuid = require('uuid/v1');
var PlayerState = {
    Stopped : 0,
    Ready : 1
}

/**
 * Representing a Player object.
 * @param {object} playerData - Object containing player information as: name,
 * @returns {void} 
 */
function Player(playerData) {
    'use strict'

    var playerId = uuid();
    
    this.name = playerData.name;
    this.pawns = [];
    this.movedPawns = [];
    this.state = PlayerState.Stopped;
    this.turnCommitCallback = null;

    /**
     * @returns {uuid} gets unique player id
     */
    this.getPlayerId = function () {
        return playerId;
    }
}

/**
 * Allows to set set of pawns.
 * @param {array} pawnsSet - represent an array of pawns of type Pawn
 * @return {void}
 */
Player.prototype.setPawns = function (pawnsSet) {
    'use strict'

    // this.pawns = pawnsSet;
}

/**
 * Call startTurn method when new turn begins and subscribe a commit callback
 * @param {function} turnCommitCallback A callback to notify game that turn is commmitted
 * @returns {void} 
 * n
 */
Player.prototype.startTurn = function (turnCommitCallback) {
    'use strict'

    this.movedPawns = [];
    this.state = PlayerState.Ready;
    this.turnCommitCallback = turnCommitCallback;
}

/**
 * Call endTurn when the turn is over and Game can be notified.
 * @return {void}
 */
Player.prototype.endTurn = function () {
    'use strict'

    // TODO Implement: this.pawns = this.pawns +/- this.movedPawns;
    // or maybe there should be an update callback to set pawnsSet after conducted move

    this.state = PlayerState.Stopped;
    if (this.turnCommitCallback) {
        this.turnCommitCallback();
    }
}

/**
 * Determines whether player is done with the current turn
 * @returns {boolean} true - when player's turn is done, false - when it's not
 */
Player.prototype.isReady = function () {
    'use strict'

    return this.state === PlayerState.Stopped;
}

module.exports = Player;