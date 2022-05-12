import {Game} from "../game";
import {Status} from "../status";
import {Board} from "../board";

describe("Game of Life", () => {
    const ALIVE = Status.ALIVE;
    const DEAD = Status.DEAD;

    it("single live cell dies", () => {
        const board: Board = new Board([[ALIVE]]);

        const newGeneration = new Game(board).next();

        expect(newGeneration[0][0]).toEqual(DEAD)
    });

    it("live cell with two live horizontal neighbours lives", () => {
        const board: Board = new Board([[ALIVE, ALIVE, ALIVE,]]);

        const newGeneration = new Game(board).next();

        expect(newGeneration[0][1]).toEqual(ALIVE);
    });

    it("live cell with two live vertical neighbours lives", () => {
        const board: Board = new Board([
            [DEAD, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD]
        ]);

        const newGeneration = new Game(board).next();

        expect(newGeneration[1][1]).toEqual(ALIVE);
    });

    it("live cell with two live diagonal top-right and bottom-left neighbours lives", () => {
        const board: Board = new Board([
            [DEAD, DEAD, ALIVE],
            [DEAD, ALIVE, DEAD],
            [ALIVE, DEAD, DEAD]
        ]);

        const newGeneration = new Game(board).next();

        expect(newGeneration[1][1]).toEqual(ALIVE);
    });

    it("live cell with two live diagonal top-left and bottom-right neighbours lives", () => {
        const board: Board = new Board([
            [ALIVE, DEAD, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, DEAD, ALIVE]
        ]);

        const newGeneration = new Game(board).next();

        expect(newGeneration[1][1]).toEqual(ALIVE);
    });

    it("live cell with three three neighbours lives", () => {
        const board: Board = new Board([
            [ALIVE, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, DEAD, ALIVE]
        ]);

        const newGeneration = new Game(board).next();

        expect(newGeneration[1][1]).toEqual(ALIVE);
    });

    it("live cell with four neighbours dies", () => {
        const board: Board = new Board([
            [ALIVE, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
            [ALIVE, ALIVE, DEAD]
        ]);

        const newGeneration = new Game(board).next();

        expect(newGeneration[1][1]).toEqual(DEAD)
    });

    it("dead cell with three neighbours become alive", () => {
        const board: Board = new Board([
            [ALIVE, ALIVE, ALIVE],
            [DEAD, DEAD, DEAD],
            [DEAD, DEAD, DEAD]
        ]);

        const newGeneration = new Game(board).next();

        expect(newGeneration[1][1]).toEqual(ALIVE);
    });

    it("next 2 generations", () => {
        const board: Board = new Board([
            [ALIVE, ALIVE, ALIVE],
            [DEAD, DEAD, DEAD],
            [DEAD, DEAD, DEAD]
        ]);

        let game = new Game(board);
        game.next();
        const twoNextGeneration = game.next();

        expect(twoNextGeneration[1][1]).toEqual(DEAD);
    });

    it("game should return all the board statuses", () => {
        const board: Board = new Board([
            [ALIVE, ALIVE, ALIVE],
            [DEAD, DEAD, DEAD],
            [DEAD, DEAD, DEAD]
        ]);

        let game = new Game(board);

        expect(game.next()).toEqual([
            [DEAD, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, DEAD, DEAD]
        ])
    });
});
