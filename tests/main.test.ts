class Game {
    private matrix: Array<string>;

    constructor(matrix: Array<string>) {
        this.matrix = matrix;
    }

    private isAlive(index: number) {
        return this.matrix[index] === "*";
    }

    next(): Array<string> {
        const result = [];
        for (let i = 0; i < this.matrix.length; i++) {
            if (this.isAlive(i)) {
                if (this.countLiveNeighbours(i) === 2) {
                    result.push("*");
                } else {
                    result.push(".");
                }
            } else {
                result.push(this.matrix[i]);
            }
        }
        return result;
    }

    private countLiveNeighbours(index: number) {
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

    it("single live cell dies", () => {
        const matrix: Array<string> = ["*"];

        const newMatrix: Array<string> = new Game(matrix).next();

        expect(newMatrix).toEqual(["."]);
    });

    it("live cell with two live neighbours lives", () => {
        const matrix: Array<string> = ["*", "*", "*",];

        const newMatrix: Array<string> = new Game(matrix).next();

        expect(newMatrix[1]).toEqual("*");
    });

});
