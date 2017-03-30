/* eslint func-style : ["error", "declaration"]
*/
var uuid = require('uuid/v1');

/**
 * Representing History object
 * @returns {void}
 */
function History() {
    'use strict'

    var historyId = uuid();

    this.records = [];
    
    /**
     * @returns {uuid} gets unique history id
     */
    this.getHistoryId = function () {
        return historyId;
    };
}

/**
 * Should be called when there is no more turns in the game and history can be called.
 * @param {number} result 0 - unresolved, 1 - player 1 wins, 2 - player 2 wins
 * @param {uuid} playerId uuid of winning player 
 * @return {void}
 */
History.prototype.end = function (result, playerId) {
    'use strict';

    this.records.push({
        result: result,
        player: playerId
    });
}

/**
 * Should be called to record a turn setup
 * @param {Player} player1 Player number 1
 * @param {Player} player2 Player number 2
 * @returns {void}
 */
History.prototype.pushTurn = function (player1, player2) {
    'use strict'

    var record = null;

    if (player1 && player2) {
        record = this.createRecord(player1, player2);

        this.records.push(record);
    }
}

/**
 * Gets the specific turn records
 * @param {number} turnNumber Number of the turn, when the first turn is 1
 * @return {object} Specific turn
 */
History.prototype.getTurn = function (turnNumber) {
    'use strict';

    return this.records[turnNumber - 1];
}


// History.prototype.saveHistory = function (history) {
//     'use strict';

//     // save history to file
// }

// History.prototype.loadHistory = function (history) {
//     'use strict';

//     // load history from file
// }

/**
 * Helper method to create record
 * @param {Player} player1 Player number 1
 * @param {Player} player2 Player number 2
 * @return {object} new record
 */
History.prototype.createRecord = function (player1, player2) {
    'use strict';

    return {
        player1: player1,
        player2: player2
    }
}

module.exports = History;