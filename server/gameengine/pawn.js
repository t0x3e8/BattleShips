/* eslint func-style : ["error", "declaration"]
*/
var uuid = require('uuid/v1');

/**
 * A class representing a Pawn object.
 * @param {object} pawnData - Object containing pawn information as: type, col, row,
 * @returns {void} 
 */
function Pawn(pawnData) {
    'use strict'

    var pawnId = uuid();
    
    this.type = pawnData.type;
    this.col = pawnData.col;
    this.row = pawnData.row;
    
    /**
     * @returns {uuid} gets unique pawn id
     */
    this.getPawnId = function () {
        return pawnId;
    }
}

Pawn.NOSHIP = 0;
Pawn.SHIP1 = 1;
Pawn.SHIP2 = 2;
// Pawn.SHIP3 = 3;
// Pawn.SHIP4 = 4;
// Pawn.SHIP5 = 5;
// Pawn.SHIP6 = 6;

module.exports = Pawn;