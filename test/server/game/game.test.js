/* eslint-disable */

var sinon = require('sinon');
var expect = require('chai').expect;
var Game = require('../../../server/game/game');
var Player = require('../../../server/game/player');
var Pawn = require('../../../server/game/pawn');

describe('Game requirements', sinon.test(function() {

    beforeEach(function( ) {

    });

    afterEach(function() {

    });

    it('Create a game with a board 12 columns and 18 rows.', sinon.test(function() {
        var game = new Game();
        
        expect(game.gameId).to.not.be.empty;
        expect(game.board.boardId).to.not.be.empty;
        expect(game.board.fields[17][11]).to.not.be.empty;
    }));

    it('Make available to 2 players to join the game with a random set of pawns.', sinon.test(function() {
        var game = new Game();

        var player1 = new Player({name : 'Player 1'});
        var pawnSet1 = [new Pawn({type : 1, positionIndex : 0}), new Pawn({type : 1, positionIndex : 2}), new Pawn({type : 2, positionIndex : 3})];
        player1.setPawns(pawnSet1);

        var player2 = new Player({name : 'Player 2'});
        var pawnSet2 = [new Pawn({type : 1, positionIndex : 0}), new Pawn({type : 1, positionIndex : 2}), new Pawn({type : 2, positionIndex : 3})];
        player2.setPawns(pawnSet2);

        game.join(player1);
        game.join(player2);

        game.start();

        expect(game.history).to.not.be.null;
        expect(game.history.historyId).to.not.be.empty;
    }));
}));