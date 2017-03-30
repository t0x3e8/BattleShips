/* eslint func-style : ["error", "declaration"]
*/
var uuid = require('uuid/v1');

/**
 * A class representing a Field object.
 * @param {object} fieldData - Object containing field information as: type, columnIndex, rowIndex,
 * @returns {void} 
 */
function Field(fieldData) {
    'use strict'

    var fieldId = uuid();
    
    this.type = fieldData.type;
    this.colIndex = fieldData.columnIndex;
    this.rowIndex = fieldData.rowIndex;
    
    /**
     * @returns {uuid} gets unique field id
     */
    this.getFieldId = function () {
        return fieldId;
    }
}

module.exports = Field;