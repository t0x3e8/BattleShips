/* eslint func-style : ["error", "declaration"],
    no-unused-vars : ["error", { "varsIgnorePattern" : "^boardId"}],
    max-depth : ["error", { "max" : 6}]
*/
var uuid = require('uuid/v1');
var settings = require('./settings');
var Field = require('./field.js');
var _ = require('underscore');

/**
 * The Board object represents the structure of the board, including characteristics  of board eg. 
 * fields of ports and the neutral fields. In addition, it shows the setup of pawns on the board of players.
 * @returns {void}
 */
function Board() {
    'use strict'

    var boardId = uuid();

    this.fields = this.createBoardFields();

    /**
     * @returns {uuid} gets unique board id
     */
    this.getBoardId = function () {
        return boardId;
    };
}

/**
 * Create an array of board fields, based on the settings.board.map
 * @returns {array} Two dimentional array of fields
 */
Board.prototype.createBoardFields = function () {
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
                rowIndex: rowPosition
            });
        }

        fields[colPosition] = row;
    }

    return fields;
}

/**
 * Initialize board with the starting setup of pawns.
 * @param {Player} player1 Player number 1
 * @param {Player} player2 Player number 2
 * @returns {void} 
 */
Board.prototype.init = function (player1, player2) {
    'use strict';

    this.setPawnsOnFields(player1.pawns, player1);
    this.setPawnsOnFields(player2.pawns, player2);
}

/**
 * Set pawns on board
 * @param {array} pawns Set of pawns to be placed on fields
 * @param {player} player Link pawns with player
 * @returns {void}
 */
Board.prototype.setPawnsOnFields = function (pawns, player) {
    'use strict'
    var that = this;

    _.each(pawns, function (pawn) {
        var col = pawn.col;
        var row = pawn.row;

        pawn.setPlayer(player);

        that.fields[col][row].pawn = pawn;
    });
}

/**
 * Processes the turn based on the pawns sets and returns game result.
 * @param {Player} player1 Player number 1
 * @param {Player} player2 Player number 2
 * @return {number} Unresolved: 0; Player1 wins: 1; Player2 wins: 2
 */
Board.prototype.processTurn = function (player1, player2) {
    'use strict';

    var that = this;

    that.processMoveAndCombat(player1);

    
    that.processMoveAndCombat(player2);
    // this.processMoveAndCombat();
    // find moved pawn of pawns set2
    // this.processMoveAndCombat();
    // set pawnsSet1 to oldPawnsSet1
    // set pawnsSet2 to oldPawnsSet2

    return this.determineGameResult();
}

/**
 * Pawns which changed their positions will be moved and any attacks will be executed.
 * @param {player} player A player which turn has to be processed.
 * @returns {void}
 */
Board.prototype.processMoveAndCombat = function (player) {
    'use strict';

    var that = this;
    var destroyedBy = [];

    _.each(player.movedPawns, function (movedPawn) {
        if (that.fields[movedPawn.col][movedPawn.row].pawn) {
            // this is Combat            
            destroyedBy = _.find(settings.pawns, function (element) {
                return element.typeId === movedPawn.type
            }).destroyedBy;

            if (_.contains(destroyedBy, movedPawn.type)) {
                that.fields[movedPawn.col][movedPawn.row].pawn = movedPawn;
                player.updatePawn(movedPawn.getPawnId(), movedPawn.col, movedPawn.row);

                // DRY!
            } else {
                player.updatePawn(movedPawn.getPawnId());
            }
        } else {
            // this is move
            that.fields[movedPawn.col][movedPawn.row].pawn = movedPawn;
            player.updatePawn(movedPawn.getPawnId(), movedPawn.col, movedPawn.row);
        }
    });
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
 * @param {uuid} pawn Pawn for which the range should be calculate
 * @returns {array} Available moves for the pawn are returned in the form of an array  
 */
Board.prototype.getPawnRange = function (pawn) {
    'use strict'

    var pawnRange = _.find(settings.pawns, function (element) {
        return element.typeId === pawn.type
    }).range;

    var fieldsInRange = [];
    var col = pawn.col - pawnRange;
    var colMax = pawn.col + pawnRange;
    var rowMin = pawn.row - pawnRange;
    var row = rowMin;
    var rowMax = pawn.row + pawnRange;
    var pawnInField = null;
    var that = this;

    // each field within the square range is tested, if: 
    // - the field has no pawns in it, mark the field as in range,
    // - the field has a pawn, but the pawn is opponent's pawn, mark the field as in range, 
    for (col; col <= colMax; col++) {
        if (typeof that.fields[col] !== 'undefined') {
            for (row; row <= rowMax; row++) {
                if (typeof that.fields[col][row] !== 'undefined') {
                    pawnInField = that.fields[col][row].pawn;
                    if (!pawnInField || pawnInField.getPlayer() && 
                        pawnInField.getPlayer().getPlayerId() !== pawn.getPlayer().getPlayerId()) {
                        fieldsInRange.push(that.fields[col][row]);
                    }

                }
            }
            row = rowMin;
        }
    }

    return fieldsInRange;
}

module.exports = Board;