import {Game, Generation} from "../game";
import {Status} from "../status";

describe("Game of Life", () => {
    const ALIVE = Status.ALIVE;
    const DEAD = Status.DEAD;

    it("single live cell dies", () => {
        const generation: Generation = [[ALIVE]];

        const newGeneration = (new Game(generation)).next();

        expect(newGeneration[0][0]).toEqual(DEAD)
    });

    it("live cell with two live horizontal neighbours lives", () => {
        const generation: Generation = [[ALIVE, ALIVE, ALIVE,]];

        const newGeneration = (new Game(generation)).next();

        expect(newGeneration[0][1]).toEqual(ALIVE);
    });

    it("live cell with two live vertical neighbours lives", () => {
        const generation: Generation = [
            [DEAD, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD]
        ];

        const newGeneration = (new Game(generation)).next();

        expect(newGeneration[1][1]).toEqual(ALIVE);
    });

    it("live cell with two live diagonal top-right and bottom-left neighbours lives", () => {
        const generation: Generation = [
            [DEAD, DEAD, ALIVE],
            [DEAD, ALIVE, DEAD],
            [ALIVE, DEAD, DEAD]
        ];

        const newGeneration = (new Game(generation)).next();

        expect(newGeneration[1][1]).toEqual(ALIVE);
    });

    it("live cell with two live diagonal top-left and bottom-right neighbours lives", () => {
        const generation: Generation = [
            [ALIVE, DEAD, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, DEAD, ALIVE]
        ];

        const newGeneration = (new Game(generation)).next();

        expect(newGeneration[1][1]).toEqual(ALIVE);
    });

    it("live cell with three three neighbours lives", () => {
        const generation: Generation = [
            [ALIVE, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, DEAD, ALIVE]
        ];

        const newGeneration = (new Game(generation)).next();

        expect(newGeneration[1][1]).toEqual(ALIVE);
    });

    it("live cell with four neighbours dies", () => {
        const generation: Generation = [
            [ALIVE, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
            [ALIVE, ALIVE, DEAD]
        ];

        const newGeneration = (new Game(generation)).next();

        expect(newGeneration[1][1]).toEqual(DEAD)
    });

    it("dead cell with three neighbours become alive", () => {
        const generation: Generation = [
            [ALIVE, ALIVE, ALIVE],
            [DEAD, DEAD, DEAD],
            [DEAD, DEAD, DEAD]
        ];

        const newGeneration = (new Game(generation)).next();

        expect(newGeneration[1][1]).toEqual(ALIVE);
    });

    it("next 2 generations", () => {
        const generation: Generation = [
            [ALIVE, ALIVE, ALIVE],
            [DEAD, DEAD, DEAD],
            [DEAD, DEAD, DEAD]
        ];

        let game = new Game(generation);
        game.next();
        const twoNextGeneration = game.next();

        expect(twoNextGeneration[1][1]).toEqual(DEAD);
    });

    it("game should return all the board statuses", () => {
        const generation: Generation = [
            [ALIVE, ALIVE, ALIVE],
            [DEAD, DEAD, DEAD],
            [DEAD, DEAD, DEAD]
        ];

        let game = new Game(generation);

        expect(game.next()).toEqual([
            [DEAD, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, DEAD, DEAD]
        ])
    });
});
