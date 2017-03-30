/* eslint func-style : ["error", "declaration"],
    no-unused-vars : ["error", { "varsIgnorePattern" : "^boardId"}]
*/
var uuid = require('uuid/v1');
var settings = require('./settings');
var Field = require('./field.js');
// var findPawnInArray = null;
var initializeFields = null;
var createArray = null;

/* global Reflect */

/**
 * The Board object represents the structure of the board, including characteristics  of board eg. 
 * fields of ports and the neutral fields. In addition, it shows the setup of pawns on the board of players.
 * @returns {void}
 */
function Board() {
    'use strict'

    var boardId = uuid();

    this.fields = initializeFields();
    this.oldPawnsSet1 = [];
    this.oldPawnsSet2 = [];

    /**
     * @returns {uuid} gets unique board id
     */
    this.getBoardId = function () {
        return boardId;
    };
}

/**
 * Initialize board with the starting setup of pawns.
 * @param {Player} player1 Player number 1
 * @param {Player} player2 Player number 2
 * @returns {void} 
 */
Board.prototype.init = function (player1, player2) {
    'use strict';

    this.oldPawnsSet1 = player1.pawns;
    this.oldPawnsSet2 = player2.pawns;
}

/**
 * Processes the turn based on the pawns sets and returns game result.
 * @param {Player} player1 Player number 1
 * @param {Player} player2 Player number 2
 * @return {number} Unresolved: 0; Player1 wins: 1; Player2 wins: 2
 */
Board.prototype.processTurn = function (player1, player2) {
    'use strict';

    // find moved pawn of pawns set1
    // this.processMoveAndCombat();
    // find moved pawn of pawns set2
    // this.processMoveAndCombat();
    // set pawnsSet1 to oldPawnsSet1
    // set pawnsSet2 to oldPawnsSet2

    return this.determineGameResult();
}

/**
 * Pawns which changed their positions will be moved and any attacks will be executed.
 * @returns {void}
 */
Board.prototype.processMoveAndCombat = function () {
    'use strict';
    // move or combat pawn agains
}

/**
 * Once completed movements the game status is checked.
 * @return {number} Unresolved: 0; Player1 wins: 1; Player2 wins: 2
 *  */
Board.prototype.determineGameResult = function () {
    'use strict';

    return 0;
}

/**
 * The range of the ship is determined on the board
 * @param {uuid} pawnId Pawn id
 * @returns {array} Available moves for the pawn are returned in the form of an array  
 */
Board.prototype.getPawnRange = function (pawnId) {
    'use strict'

    // var pawn = findPawnInArray(this.oldPawnsSet1, this.oldPawnsSet2, pawnId);

    return [1, 2, 3];
}

// findPawnInArray = function (pawnSet1, pawnSet2, searchingPawnId) {
//     'use strict'
//     var pawnSets = pawnSet1.concat(pawnSet2);

//     return pawnSets.find(function (pawn) {
//         return pawn.getPawnId() === searchingPawnId;
//     });
// }

initializeFields = function () {
    'use strict'

    var fieldsMap = settings.board.map;
    var numberOfColumns = settings.board.numberOfColumns;
    var numberOfRows = settings.board.numberOfRows;
    var colPosition = 0;
    var rowPosition = 0;
    var fields = [];
    var fieldType = 0;
    var row = [];

    for (colPosition = 0; colPosition < numberOfColumns; colPosition++) {
        row = [];
        for (rowPosition = 0; rowPosition < numberOfRows; rowPosition++) {
            fieldType = fieldsMap[colPosition][rowPosition];

            row[rowPosition] = new Field({
                type: fieldType,
                columnIndex: colPosition,
                rowIndex: colPosition
            });
        }

        fields[colPosition] = row;
    }

    return fields;
}


module.exports = Board;