/* eslint-disable */

var sinon = require('sinon');
var expect = require('chai').expect;
var Game = require('../../../server/game/game');
var Board = require('../../../server/game/board');
var Player = require('../../../server/game/player');
var Pawn = require('../../../server/game/pawn');

describe('Game requirements', sinon.test(function () {
    var player1 = null;
    var player2 = null;
    var pawnSet1 = [];
    var pawnSet2 = [];

    beforeEach(function () {
        player1 = new Player({ name: 'Player 1' });
        pawnSet1 = [new Pawn({ type: 1, positionIndex: 0 }), new Pawn({ type: 1, positionIndex: 2 }), new Pawn({ type: 2, positionIndex: 3 })];
        player1.setPawns(pawnSet1);

        player2 = new Player({ name: 'Player 2' });
        pawnSet2 = [new Pawn({ type: 1, positionIndex: 0 }), new Pawn({ type: 1, positionIndex: 2 }), new Pawn({ type: 2, positionIndex: 3 })];
        player2.setPawns(pawnSet2);
    });

    afterEach(function () {

    });

    it('Create a board of 12 columns and 18 rows.', sinon.test(function () {
        var board = new Board();

        expect(board.getBoardId()).to.not.be.empty;
        expect(board.fields[17][11]).to.not.be.empty;
    }));

    it('Make available to two players to join the game with a random set of pawns.', sinon.test(function () {
        var game = new Game();
        game.join(player1);
        game.join(player2);

        game.start();
        
        expect(game.getGameId()).to.not.be.null;
        expect(game.history).to.not.be.null;
        expect(game.history.getHistoryId()).to.not.be.empty;
        expect(game.getState()).to.be.equal(2);  // 2 indicates waiting
    }));

    it('Let both users execute their moves with recording history.', sinon.test(function () {
        var game = new Game();
        game.join(player1);
        game.join(player2);
        game.start(function () {
            pawnSet1[0].positionIndex = 4;
            player1.setPawns(pawnSet1);
            player1.endTurn();

            pawnSet2[1].positionIndex = 5;
            player2.setPawns(pawnSet2);
            player2.endTurn();
        });
    }));

    it.skip('Let history inform both player (as event, callback) when is time for the next turn', sinon.test(function () {

    }));

    it.skip('When a pawn is selected return fields on which the move could be executed (select range)', sinon.test(function () {

    }));
}));