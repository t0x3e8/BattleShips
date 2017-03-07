/* eslint func-style : ["error", "declaration"]
*/
var uuid = require('uuid/v1');

/**
 * A class representing History object
 * @returns {void}
 */
function History() {
    'use strict'
    // var that = this;

    this.historyId = uuid();
}

module.exports = History;