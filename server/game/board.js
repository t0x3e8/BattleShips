/* eslint func-style : ["error", "declaration"],
    no-unused-vars : ["error", { "varsIgnorePattern" : "^boardId"}]
*/
var uuid = require('uuid/v1');
var settings = require('./settings');

/**
 * The Board object represents the structure of the board, including characteristics  of board eg. 
 * fields of ports and the neutral fields. In addition, it shows the setup of pawns on the board of players.
 * @returns {void}
 */
function Board() {
    'use strict'

    var boardId = uuid();

    this.fields = settings.board.map;
    this.oldPawnsSet1 = [];
    this.oldPawnsSet2 = [];

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

module.exports = Board;