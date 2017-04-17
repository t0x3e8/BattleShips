/* eslint-disable */

var sinon = require('sinon');
var expect = require('chai').expect;
var Game = require('../../../server/gameengine/game');
var Board = require('../../../server/gameengine/board');
var Player = require('../../../server/gameengine/player');
var Pawn = require('../../../server/gameengine/pawn');
var GameState = {
    NotStarted: 0,
    Started: 1,
    Waiting: 2,
    Turn: 3,
    Ended: 4
}

describe('Game Engine requirements', sinon.test(function () {
    var player1 = null;
    var player2 = null;
    var pawnSet1 = [];
    var pawnSet2 = [];

    beforeEach(function () {
        player1 = new Player({ name: 'Player 1' });
        pawnSet1 = [new Pawn({ type: 1, col: 3, row: 0 }), new Pawn({ type: 1, col: 0, row: 0 }), new Pawn({ type: 2, col: 1, row: 0 })];
        player1.setPawns(pawnSet1);

        player2 = new Player({ name: 'Player 2' });
        pawnSet2 = [new Pawn({ type: 1, col: 3, row: 10 }), new Pawn({ type: 1, col: 0, row: 10 }), new Pawn({ type: 2, col: 1, row: 10 })];
        player2.setPawns(pawnSet2);
    });

    afterEach(function () {

    });

    it('Create a board of 12 columns and 18 rows', sinon.test(function () {
        var board = new Board();

        expect(board.getBoardId()).to.not.be.empty;
        expect(board.fields[11][17]).to.not.be.empty;
    }));

    it('Allow two players to join the game with random pawns', sinon.test(function () {
        var game = new Game();
        game.join(player1);
        game.join(player2);

        game.start();

        expect(game.getGameId()).to.not.be.null;
        expect(game.history).to.not.be.null;
        expect(game.history.getHistoryId()).to.not.be.empty;
        expect(game.getState()).to.be.equal(GameState.Waiting);
    }));

    it('Let both players execute their moves while history is being recorded', sinon.test(function (done) {
        var game = new Game();
        var numberOfTurns = 5;
        var turn = function () {
            numberOfTurns = numberOfTurns - 1;
            if (numberOfTurns === 0) {
                sinon.stub(game.board, "determineGameResult").returns(1);
            }

            expect(player1.isReady()).to.be.false;
            pawnSet1[0] = new Pawn({ type: 1, col: 2, row: player1.pawns[0].row + 1, pawnId: player1.pawns[0].getPawnId() });
            player1.setPawns(pawnSet1);
            player1.endTurn();

            expect(player2.isReady()).to.be.false;
            pawnSet2[0] = new Pawn({ type: 1, col: 3, row: player2.pawns[0].row - 1, pawnId: player2.pawns[0].getPawnId() });
            player2.setPawns(pawnSet2);
            player2.endTurn();
        };
        game.join(player1);
        game.join(player2);

        game.on('gameWaiting', turn);
        game.on('gameEnded', function () {
            var lastTurnNumber = game.history.records.length;
            expect(lastTurnNumber).to.be.equal(7);
            expect(player1.pawns[0].row).to.be.equal(5);
            expect(player2.pawns[0].row).to.be.equal(5);
            expect(game.history.getTurn(lastTurnNumber)).to.not.be.null;
            expect(game.history.getTurn(lastTurnNumber).result).to.be.equal(1); //player 1 wins
            done();
        })
        game.start();

    }));

    it('Determines which pawns were moved during turns', sinon.test(function (done) {
        player1 = new Player({ name: 'Player 1' });
        expect(player1.pawns).to.be.empty;
        player1.setPawns([new Pawn({ type: 2, col: 0, row: 0 }), new Pawn({ type: 2, col: 1, row: 0 })]);
        expect(player1.pawns.length).to.equal(2);
        expect(player1.movedPawns).to.be.empty;

        player2 = new Player({ name: 'Player 2' });
        expect(player2.pawns).to.be.empty;
        player2.setPawns([new Pawn({ type: 1, col: 0, row: 17 })]);
        expect(player2.pawns.length).to.equal(1);
        expect(player2.movedPawns).to.be.empty;

        var game = new Game();
        game.join(player1);
        game.join(player2);
        game.on('gameWaiting', function () {
            var pawnsSet = player1.pawns;
            player1.setPawns([
                new Pawn({ type: 2, col: 2, row: 1, pawnId: player1.pawns[0].getPawnId() }),
                new Pawn({ type: 2, col: 1, row: 0, pawnId: player1.pawns[1].getPawnId() })
            ]);

            expect(player1.pawns.length).to.equal(2);
            expect(player1.movedPawns).to.not.be.empty;
            expect(player1.movedPawns[0].col).to.equal(2);
            expect(player1.movedPawns[0].row).to.equal(1);

            done();
        });
        game.start();
    }));

    it('Specify the range of the pawn considering the position of the pawn in the board', sinon.test(function (done) {
        var player1 = new Player({ name: 'Player 1' });
        player1.setPawns([new Pawn({ type: 2, col: 0, row: 0 })]);
        var player2 = new Player({ name: 'Player 2' });
        player2.setPawns([new Pawn({ type: 1, col: 0, row: 17 }), new Pawn({ type: 1, col: 1, row: 17 })]);

        var game = new Game();
        game.join(player1);
        game.join(player2);
        game.on('gameWaiting', function () {
            var range = game.board.getPawnRange(player2.pawns[0]);
            expect(game.board.fields[0][0].pawn.type).to.be.equal(2);
            expect(game.board.fields[0][17].pawn.type).to.be.equal(1);
            expect(game.board.fields[0][16].pawn).to.be.null;
            expect(range.length).to.be.equal(2);
            expect(range[0].rowIndex).to.be.equal(16);
            expect(range[0].colIndex).to.be.equal(0);
            expect(range[1].rowIndex).to.be.equal(16);
            expect(range[1].colIndex).to.be.equal(1);
            done();
        });

        game.start();
    }));

    it.skip('Simulate combat between ships', sinon.test(function (done) {
        pawnSet1 = [new Pawn({ type: 2, col: 0, row: 16 })];
        player1 = new Player({ name: 'Player 1' });
        player1.setPawns(pawnSet1);

        pawnSet2 = [new Pawn({ type: 1, col: 0, row: 17 }), new Pawn({ type: 1, col: 1, row: 17 })];
        player2 = new Player({ name: 'Player 2' });
        player2.setPawns(pawnSet2);

        var game = new Game();
        game.join(player1);
        game.join(player2);
        game.on('gameWaiting', function () {
            var range = game.board.getPawnRange(player2.pawns[0]);
            expect(range.length).to.be.equal(2);

            var pawnPlayer2 = new Pawn({ type: 1, col: 0, row: 16, pawnId: pawnSet2[0].getPawnId() });
            player2.setPawns([pawnPlayer2, pawnSet2[1]]);
            expect(player2.movedPawns.length).to.equal(1);
            expect(player2.movedPawns[0].getPawnId()).to.equal(pawnSet2[0].getPawnId());
            player2.endTurn();

            var pawnPlayer1 = new Pawn({ type: 2, col: 0, row: 15, pawnId: pawnSet1[0].getPawnId() });
            player1.setPawns([pawnPlayer1]);
            expect(player1.movedPawns.length).to.equal(1);
            expect(player1.movedPawns[0].getPawnId()).to.equal(pawnSet1[0].getPawnId());
            player1.endTurn();
        });

        game.start();
    }));
}));