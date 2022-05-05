import {Game} from "../game";
import {Board, Status} from "../types";
import {NewBoard} from "../NewBoard";

describe("Game of Life", () => {
    const ALIVE = Status.ALIVE;
    const DEAD = Status.DEAD;

    it("single live cell dies", () => {
        const matrix: Board = [[ALIVE]];

        const newMatrix: NewBoard = new Game(matrix).next();

        expect(newMatrix.isDead(0,0)).toBeTruthy();
    });

    it("live cell with two live horizontal neighbours lives", () => {
        const matrix: Board = [[ALIVE, ALIVE, ALIVE,]];

        const newMatrix: NewBoard = new Game(matrix).next();

        expect(newMatrix.isAlive(0,1)).toBeTruthy();
    });

    it("live cell with two live vertical neighbours lives", () => {
        const matrix: Board = [
            [DEAD, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD]
        ];

        const newMatrix: NewBoard = new Game(matrix).next();

        expect(newMatrix.isAlive(1,1)).toBeTruthy();
    });

    it("live cell with two live diagonal top-right and bottom-left neighbours lives", () => {
        const matrix: Board = [
            [DEAD, DEAD, ALIVE],
            [DEAD, ALIVE, DEAD],
            [ALIVE, DEAD, DEAD]
        ];

        const newMatrix: NewBoard = new Game(matrix).next();

        expect(newMatrix.isAlive(1,1)).toBeTruthy();
    });

    it("live cell with two live diagonal top-left and bottom-right neighbours lives", () => {
        const matrix: Board = [
            [ALIVE, DEAD, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, DEAD, ALIVE]
        ];

        const newMatrix: NewBoard = new Game(matrix).next();

        expect(newMatrix.isAlive(1,1)).toBeTruthy();
    });

    it("live cell with three three neighbours lives", () => {
        const matrix: Board = [
            [ALIVE, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, DEAD, ALIVE]
        ];

        const newMatrix: NewBoard = new Game(matrix).next();

        expect(newMatrix.isAlive(1,1)).toBeTruthy();
    });

    it("live cell with four neighbours dies", () => {
        const matrix: Board = [
            [ALIVE, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
            [ALIVE, ALIVE, DEAD]
        ];

        const newMatrix: NewBoard = new Game(matrix).next();

        expect(newMatrix.isDead(1,1)).toBeTruthy();
    });

    it("dead cell with three neighbours become alive", () => {
        const matrix: Board = [
            [ALIVE, ALIVE, ALIVE],
            [DEAD, DEAD, DEAD],
            [DEAD, DEAD, DEAD]
        ];

        const newMatrix: NewBoard = new Game(matrix).next();

        expect(newMatrix.isAlive(1,1)).toBeTruthy();
    });
});
