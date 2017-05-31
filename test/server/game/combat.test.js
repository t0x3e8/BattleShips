/* eslint-disable */

var sinon = require('sinon');
var expect = require('chai').expect;
var Combat = require('../../../server/gameengine/combat');

describe('Ships combat simulation', sinon.test(function () {
    it('Testing of possible results of combat', sinon.test(function () {
        var combat = new Combat();
        var result = null;
        
        result = combat.process(100001, 100002);
        expect(result).to.equal(1);

        result = combat.process(100002, 100001);
        expect(result).to.equal(-1);

        result = combat.process(100001, 100001);
        expect(result).to.equal(0);
    }));
}));