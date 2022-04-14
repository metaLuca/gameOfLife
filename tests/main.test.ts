enum Status {
    ALIVE = "*",
    DEAD = "."
}

class Game {
    private matrix: Array<Array<string>>;

    constructor(matrix: Array<Array<string>>) {
        this.matrix = matrix;
    }

    private isAlive(index: number) {
        return this.matrix[0][index] === Status.ALIVE;
    }

    next(): Array<Array<string>> {
        const result = [];

        const firstLine = this.matrix[0];
        for (let i = 0; i < firstLine.length; i++) {
            if (this.isAlive(i)) {
                if (this.countAliveNeighbours(i) === 2) {
                    result.push(Status.ALIVE);
                } else {
                    result.push(Status.DEAD);
                }
            } else {
                result.push(firstLine[i]);
            }
        }
        return [result];
    }

    private countAliveNeighbours(index: number) {
        let totalLivingNeighbours = 0;

        if (this.isAlive(index - 1)) {
            totalLivingNeighbours++;
        }
        if (this.isAlive(index + 1)) {
            totalLivingNeighbours++;
        }

        return totalLivingNeighbours;
    }
}

describe("Game of Life", () => {

    const ALIVE = "*";
    const DEAD = ".";

    it("single live cell dies", () => {
        const matrix: Array<Array<string>> = [[ALIVE]];

        const newMatrix: Array<Array<string>> = new Game(matrix).next();

        expect(newMatrix[0]).toEqual([DEAD]);
    });

    it("live cell with two live horizontal neighbours lives", () => {
        const matrix: Array<Array<string>> = [[ALIVE, ALIVE, ALIVE,]];

        const newMatrix: Array<Array<string>> = new Game(matrix).next();

        expect(newMatrix[0][1]).toEqual(ALIVE);
    });

    it.skip("live cell with two live vertical neighbours lives", () => {
        const matrix: Array<Array<string>> = [
            [DEAD, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD]
        ];

        const newMatrix: Array<Array<string>> = new Game(matrix).next();

        expect(newMatrix).toEqual([
            [DEAD, DEAD, DEAD],
            [ALIVE, ALIVE, ALIVE],
            [DEAD, DEAD, DEAD]
        ]);
    });

});
