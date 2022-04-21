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
});
