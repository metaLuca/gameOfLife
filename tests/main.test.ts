enum Status {
    ALIVE = "*",
    DEAD = "."
}

class Game {
    private matrix: Array<Array<string>>;

    constructor(matrix: Array<Array<string>>) {
        this.matrix = matrix;
    }

    private isAlive(row: number, column: number) {
        return this.matrix[row][column] === Status.ALIVE;
    }

    next(): Array<Array<string>> {
        const result = [];


        for (let row = 0; row < this.matrix.length; row++) {
            const line = this.matrix[row];
            const newLine = [];
            for (let column = 0; column < line.length; column++) {
                if (this.isAlive(row, column)) {
                    if (this.countAliveNeighbours(row, column) === 2) {
                        newLine.push(Status.ALIVE);
                    } else {
                        newLine.push(Status.DEAD);
                    }
                } else {
                    newLine.push(line[column]);
                }
            }
            result.push(newLine);
        }
        return result;
    }

    private countAliveNeighbours(row: number, column: number) {
        let totalLivingNeighbours = 0;

        if (this.isAlive(row,column - 1)) {
            totalLivingNeighbours++;
        }
        if (this.isAlive(row,column + 1)) {
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

        expect(newMatrix[1][1]).toEqual(ALIVE);
    });

});
