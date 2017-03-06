/* eslint func-style : ["error", "declaration"]
*/
var uuid = require('uuid/v1');
var settings = require('./settings');

/**
 * A class representing Board object
 * @returns {void}
 */
function Board () {
    'use strict'
    // var that = this;
    
    this.boardId = uuid();
    this.fields = settings.board.map;
}

module.exports = Board;