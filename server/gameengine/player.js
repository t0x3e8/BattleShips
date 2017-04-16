/* eslint func-style : ["error", "declaration"]
*/
var uuid = require('uuid/v1');
var _ = require('underscore');
var PlayerState = {
    Stopped: 0,
    Ready: 1
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

    var that = this;

    that.movedPawns = [];

    if (that.pawns.length === 0) {
        that.pawns = pawnsSet.slice();
    } else {
        // find moved pawns by comparing two pawns set (old and new one)
        _.each(that.pawns, function (pawn) {
            var newPawn = _.find(pawnsSet, function (tempPawn) {
                return tempPawn.getPawnId() === pawn.getPawnId();
            });

            if (newPawn.col !== pawn.col || newPawn.row !== pawn.row) {
                that.movedPawns.push(newPawn);
            }
        });
    }
}

/**
 * Amend moved pawns and merge them with current pawns set. Usually it takes place when the moved is fully processed.
 * @param {uuid} pawnId Id of pawn which is going to be updated
 * @param {numeric} newCol Numeric position of column on the grid, or undefined if need to be removed
 * @param {numeric} newRow Numeric position of row on the grid, or undefined if need to be removed 
 * @return {void}
 */
Player.prototype.updatePawn = function (pawnId, newCol, newRow) {
    'use strict'

    var that = this;
    var pawnToUpdate = _.find(that.pawnsSet, function (tempPawn) {
        return tempPawn.getPawnId() === pawnId;
    });

    if (pawnToUpdate) {
        pawnToUpdate.col = newCol || undefined; 
        pawnToUpdate.row = newRow || undefined;
    }
}

/**
 * Call startTurn method when new turn begins and subscribe a commit callback
 * @param {function} turnCommitCallback A callback to notify game that turn is commmitted
 * @returns {void} 
 * n
 */
Player.prototype.startTurn = function (turnCommitCallback) {
    'use strict'

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