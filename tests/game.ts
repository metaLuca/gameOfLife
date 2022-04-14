enum Status {
    ALIVE = "*",
    DEAD = "."
}

export class Game {
    private matrix: Array<Array<string>>;

    constructor(matrix: Array<Array<string>>) {
        this.matrix = matrix;
    }

    private isAlive(row: number, column: number) {
        if (!this.matrix[row]) {
            return false;
        }
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

        if (this.isAlive(row, column - 1)) {
            totalLivingNeighbours++;
        }
        if (this.isAlive(row, column + 1)) {
            totalLivingNeighbours++;
        }
        if (this.isAlive(row - 1, column)) {
            totalLivingNeighbours++;
        }
        if (this.isAlive(row + 1, column)) {
            totalLivingNeighbours++;
        }

        return totalLivingNeighbours;
    }
}
