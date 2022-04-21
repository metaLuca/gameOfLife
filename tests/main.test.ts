import {Board, Game} from "./game";

describe("Game of Life", () => {
    const ALIVE = "*";
    const DEAD = ".";

    it("single live cell dies", () => {
        const matrix: Board = [[ALIVE]];

        const newMatrix: Board = new Game(matrix).next();

        expect(newMatrix[0]).toEqual([DEAD]);
    });

    it("live cell with two live horizontal neighbours lives", () => {
        const matrix: Board = [[ALIVE, ALIVE, ALIVE,]];

        const newMatrix: Board = new Game(matrix).next();

        expect(newMatrix[0][1]).toEqual(ALIVE);
    });

    it("live cell with two live vertical neighbours lives", () => {
        const matrix: Board = [
            [DEAD, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD]
        ];

        const newMatrix: Board = new Game(matrix).next();

        expect(newMatrix[1][1]).toEqual(ALIVE);
    });

    it("live cell with two live diagonal top-right and bottom-left neighbours lives", () => {
        const matrix: Board = [
            [DEAD, DEAD, ALIVE],
            [DEAD, ALIVE, DEAD],
            [ALIVE, DEAD, DEAD]
        ];

        const newMatrix: Board = new Game(matrix).next();

        expect(newMatrix[1][1]).toEqual(ALIVE);
    });

    it("live cell with two live diagonal top-left and bottom-right neighbours lives", () => {
        const matrix: Board = [
            [ALIVE, DEAD, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, DEAD, ALIVE]
        ];

        const newMatrix: Board = new Game(matrix).next();

        expect(newMatrix[1][1]).toEqual(ALIVE);
    });

    it("live cell with three three neighbours lives", () => {
        const matrix: Board = [
            [ALIVE, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, DEAD, ALIVE]
        ];

        const newMatrix: Board = new Game(matrix).next();

        expect(newMatrix[1][1]).toEqual(ALIVE);
    });

    it("live cell with four neighbours dies", () => {
        const matrix: Board = [
            [ALIVE, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
            [ALIVE, ALIVE, DEAD]
        ];

        const newMatrix: Board = new Game(matrix).next();

        expect(newMatrix[1][1]).toEqual(DEAD);
    });
});
