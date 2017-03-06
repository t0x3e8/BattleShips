/* eslint-disable */

var sinon = require('sinon');
var expect = require('chai').expect;
var Game = require('../../../server/game/game');

describe('Game requirements', sinon.test(function() {

    beforeEach(function( ) {

    });

    afterEach(function() {

    });

    it('Create a game with a board 12x18', sinon.test(function() {
        var game = new Game();
        
        expect(game.gameId).to.not.be.empty;
        expect(game.board.boardId).to.not.be.empty;
        expect(game.board.fields[17][11]).to.not.be.empty;
    }));
}));