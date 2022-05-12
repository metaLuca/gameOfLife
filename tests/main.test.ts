import {Game} from "../game";
import {Status} from "../status";
import {Board} from "../board";
import {Position} from "../position";

describe("Game of Life", () => {
    const ALIVE = Status.ALIVE;
    const DEAD = Status.DEAD;

    it("single live cell dies", () => {
        const board: Board = new Board([[ALIVE]]);

        const newBoard: Board = new Game(board).next();

        expect(newBoard.isDead(new Position(0, 0))).toBeTruthy();
    });

    it("live cell with two live horizontal neighbours lives", () => {
        const board: Board = new Board([[ALIVE, ALIVE, ALIVE,]]);

        const newBoard: Board = new Game(board).next();

        expect(newBoard.isAlive(new Position(0, 1))).toBeTruthy();
    });

    it("live cell with two live vertical neighbours lives", () => {
        const board: Board = new Board([
            [DEAD, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD]
        ]);

        const newBoard: Board = new Game(board).next();

        expect(newBoard.isAlive(new Position(1, 1))).toBeTruthy();
    });

    it("live cell with two live diagonal top-right and bottom-left neighbours lives", () => {
        const board: Board = new Board([
            [DEAD, DEAD, ALIVE],
            [DEAD, ALIVE, DEAD],
            [ALIVE, DEAD, DEAD]
        ]);

        const newBoard: Board = new Game(board).next();

        expect(newBoard.isAlive(new Position(1, 1))).toBeTruthy();
    });

    it("live cell with two live diagonal top-left and bottom-right neighbours lives", () => {
        const board: Board = new Board([
            [ALIVE, DEAD, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, DEAD, ALIVE]
        ]);

        const newBoard: Board = new Game(board).next();

        expect(newBoard.isAlive(new Position(1, 1))).toBeTruthy();
    });

    it("live cell with three three neighbours lives", () => {
        const board: Board = new Board([
            [ALIVE, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, DEAD, ALIVE]
        ]);

        const newBoard: Board = new Game(board).next();

        expect(newBoard.isAlive(new Position(1, 1))).toBeTruthy();
    });

    it("live cell with four neighbours dies", () => {
        const board: Board = new Board([
            [ALIVE, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
            [ALIVE, ALIVE, DEAD]
        ]);

        const newBoard: Board = new Game(board).next();

        expect(newBoard.isDead(new Position(1, 1))).toBeTruthy();
    });

    it("dead cell with three neighbours become alive", () => {
        const board: Board = new Board([
            [ALIVE, ALIVE, ALIVE],
            [DEAD, DEAD, DEAD],
            [DEAD, DEAD, DEAD]
        ]);

        const newBoard: Board = new Game(board).next();

        expect(newBoard.isAlive(new Position(1, 1))).toBeTruthy();
    });
});
