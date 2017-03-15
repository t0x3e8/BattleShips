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

    this.playerId = uuid();
    this.name = playerData.name;
    this.pawns = [];
    this.state = PlayerState.Stopped;
    this.turnCommitCallback = null;
}

/**
 * Allows to set set of pawns.
 * @param {array} pawnsSet - represent an array of pawns of type Pawn
 * @return {void}
 */
Player.prototype.setPawns = function (pawnsSet) {
    'use strict'

    this.pawns = pawnsSet;
}

Player.prototype.startTurn = function (turnCommitCallback) {
    'use strict'

    this.state = PlayerState.Ready;
    this.turnCommitCallback = turnCommitCallback;
}

Player.prototype.endTurn = function () {
    'use strict'

    this.state = PlayerState.Stopped;
    if (this.turnCommitCallback) {
        this.turnCommitCallback();
    }
}

Player.prototype.isReady = function () {
    'use strict'

    return this.state === PlayerState.Stopped;
}

module.exports = Player;