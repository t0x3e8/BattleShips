/* eslint func-style : ["error", "declaration"]
*/
var uuid = require('uuid/v1');

/**
 * A class representing a Pawn object.
 * @param {object} pawnData - Object containing pawn information as: type, col, row, playerId
 * @returns {void} 
 */
function Pawn(pawnData) {
    'use strict'

    var pawnId = uuid();
    
    this.type = pawnData.type;
    this.col = pawnData.col;
    this.row = pawnData.row;
    this.player = null;
    
    /**
     * @returns {uuid} gets unique pawn id
     */
    this.getPawnId = function () {
        return pawnId;
    }
}

/**
 * Assign pawn to provided player
 * @param {player} player Player instance
 * @returns {void} 
 */
Pawn.prototype.setPlayer = function (player) {
    'use strict'
    this.player = player;
}

/**
 * Get assigned player for pawn
 * @returns {player} returns assigned player
 */
Pawn.prototype.getPlayer = function () {
    'use strict'

    return this.player;
}

module.exports = Pawn;