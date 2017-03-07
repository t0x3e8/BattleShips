/* eslint func-style : ["error", "declaration"]
*/
var uuid = require('uuid/v1');

/**
 * A class representing a Pawn object.
 * @param {object} pawnData - Object containing pawn information as: type, positionIndex,
 * @returns {void} 
 */
function Pawn(pawnData) {
    'use strict'
    // var that = this;

    this.pawnId = uuid();
    this.type = pawnData.type;
    this.positionIndex = pawnData.positionIndex;
}

Pawn.NOSHIP = 0;
Pawn.SHIP1 = 1;
Pawn.SHIP2 = 2;
// Pawn.SHIP3 = 3;
// Pawn.SHIP4 = 4;
// Pawn.SHIP5 = 5;
// Pawn.SHIP6 = 6;

module.exports = Pawn;