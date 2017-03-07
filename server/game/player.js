/* eslint func-style : ["error", "declaration"]
*/
var uuid = require('uuid/v1');

/**
 * A class representing a Player object.
 * @param {object} playerData - Object containing player information as: name,
 * @returns {void} 
 */
function Player(playerData) {
    'use strict'

    this.playerId = uuid();
    this.name = playerData.name;
    this.pawns = [];
}

/**
 * A method which allows to set set of pawns.
 * @param {array} pawnsSet - represent an array of pawns of type Pawn
 * @return {void}
 */
Player.prototype.setPawns = function (pawnsSet) {
    'use strict'

    this.pawns = pawnsSet;
}

module.exports = Player;