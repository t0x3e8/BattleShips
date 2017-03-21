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
    this.turn = 0;

    this.getHistoryId = function () {
        return historyId;
    };
}

History.prototype.init = function (players) {
    'use strict';
    var record = null;

    if (players && players.length === 2) {
        record = this.createRecord(0, players);

        this.records.push(record);
    }
}

History.prototype.end = function (data) {
    'use strict';

    // setup flag that the hisotyr is closed
}

History.prototype.pushTurn = function (player1, player2) {
    'use strict'

    // uses createRecord method to create entry and pushes it to history
}

History.prototype.getTurn = function (turnNumber) {
    'use strict';

    // fetches a turn from the set
}

History.prototype.loadHistory = function (history) {
    'use strict';

    // load history from file
}

History.prototype.createRecord = function (turn, players) {
    'use strict';

    return {
        turn: turn,
        player1: players[0],
        player2: players[1]
    }
}

module.exports = History;