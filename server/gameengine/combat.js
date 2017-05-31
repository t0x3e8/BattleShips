/* eslint func-style : ["error", "declaration"]
*/

var settings = require('./settings');
var _ = require('underscore');

/**
 * Object processes combats based on provided oponents.
 * @return {void}
 */
function Combat() {
    'use strict';
}

/** 
 * Functions processes the result of the combat.
 * @param {number} attackerUnitType The number which represents attacker unit type.
 * @param {number} defenderUnitType The number which represents attacker unit type.
 * @returns {number} Number which represents result of combat: 1 attacker wins, 
 * 0 attacker and defender lose, 1 defender wins 
 */
Combat.prototype.process = function (attackerUnitType, defenderUnitType) {
    'use strict'

    var attPawn = _.find(settings.pawns, function (element) {
        return element.typeId === attackerUnitType
    });
    var defPawn = _.find(settings.pawns, function (element) {
        return element.typeId === defenderUnitType
    });

    if (_.contains(attPawn.destroy, defPawn.typeId) && _.contains(defPawn.destroy, attPawn.typeId)) {
        // defender and attacker lose
        return 0;
    } else if (_.contains(attPawn.destroy, defPawn.typeId)) {
        // attacker wins        
        return 1;
    } else if (_.contains(defPawn.destroy, attPawn.typeId)) {
        // defender wins
        return -1;
    }

    return 0;
}

module.exports = Combat;