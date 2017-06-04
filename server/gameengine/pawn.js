/* eslint func-style : ["error", "declaration"]
*/
var uuid = require('uuid/v1');
var _ = require('underscore');

/**
 * A class representing a Pawn object.
 * @param {object} pawnData - Object containing pawn information as: type, col, row, pawnId (optional)
 * @returns {void} 
 */
function Pawn(pawnData) {
    'use strict'
    
    var pawnId = pawnData.pawnId || uuid();

    this.type = pawnData.type;
    this.col = this.oldCol = pawnData.col;
    this.row = this.oldRow = pawnData.row;
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

Pawn.prototype.updatePosition = function (newCol, newRow) {
    'use strict'

    this.col = newCol;
    this.row = newRow;

    if ((this.col === undefined || this.row === undefined) && this.player) {
        // check whether the method "player.setPawns" is not more appropriate
        // this.player.pawns = _.without(this.player.pawns, this);
        this.player.setPawns(_.without(this.player.pawns, this));
    }
}

Pawn.prototype.resetState = function () {
    'use strict'

    this.oldCol = this.col;
    this.oldRow = this.row;
}

module.exports = Pawn;