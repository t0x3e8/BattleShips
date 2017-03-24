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
    var that = this;

    this.records = [];

    this.getHistoryId = function () {
        return historyId;
    };

    this.getTurnNumber = function () {
        return that.records.length;
    }
}

History.prototype.end = function (result, playerId) {
    'use strict';

    this.records.push({
        result: result,
        player: playerId
    });
}

History.prototype.pushTurn = function (player1, player2) {
    'use strict'

    var record = null;

    if (player1 && player2) {
        record = this.createRecord(player1, player2);

        this.records.push(record);
    }
}

History.prototype.getTurn = function (turnNumber) {
    'use strict';

    return this.records[turnNumber - 1];
}

History.prototype.loadHistory = function (history) {
    'use strict';

    // load history from file
}

History.prototype.createRecord = function (turn, player1, player2) {
    'use strict';

    return {
        player1: player1,
        player2: player2
    }
}

module.exports = History;