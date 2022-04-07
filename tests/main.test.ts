enum Status {
    ALIVE = "*",
    DEAD = "."
}

class Game {
    private matrix: Array<string>;

    constructor(matrix: Array<string>) {
        this.matrix = matrix;
    }

    private isAlive(index: number) {
        return this.matrix[index] === Status.ALIVE;
    }

    next(): Array<string> {
        const result = [];
        for (let i = 0; i < this.matrix.length; i++) {
            if (this.isAlive(i)) {
                if (this.countAliveNeighbours(i) === 2) {
                    result.push(Status.ALIVE);
                } else {
                    result.push(Status.DEAD);
                }
            } else {
                result.push(this.matrix[i]);
            }
        }
        return result;
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
        const matrix: Array<string> = [ALIVE];

        const newMatrix: Array<string> = new Game(matrix).next();

        expect(newMatrix).toEqual([DEAD]);
    });

    it("live cell with two live horizontal neighbours lives", () => {
        const matrix: Array<string> = [ALIVE, ALIVE, ALIVE,];

        const newMatrix: Array<string> = new Game(matrix).next();

        expect(newMatrix[1]).toEqual(ALIVE);
    });

    it("live cell with two live vertical neighbours lives", () => {
        const matrix: Array<Array<string>> = [
            [DEAD, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD]
        ];

        const newMatrix: Array<string> = new Game(matrix).next();

        expect(newMatrix[1]).toEqual(DEAD);
    });

});
