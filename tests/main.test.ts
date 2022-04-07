class Game {
    private matrix: Array<string>;

    constructor(matrix: Array<string>) {
        this.matrix = matrix;
    }

    next(): Array<string> {
        const result = [];
        for (let i = 0; i < this.matrix.length; i++) {
            if (this.matrix[i] === "*") {
                if (this.matrix[i - 1] === "*" && this.matrix[i + 1] === "*") {
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
