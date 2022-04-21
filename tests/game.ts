enum Status {
    ALIVE = "*",
    DEAD = "."
}

export type Board = Array<Array<string>>

export class Game {
    private readonly matrix: Board;

    constructor(matrix: Board) {
        this.matrix = matrix;
    }

    private isAlive(row: number, column: number) {
        if (!this.matrix[row]) {
            return false;
        }
        return this.matrix[row][column] === Status.ALIVE;
    }

    private isDead(row: number, column: number) {
        return !this.isAlive(row, column);
    }

    next(): Board {
        return this.matrix.map((row, rowIndex) => {
            return row.map((column, columnIndex) => {
                return this.nextStatusFor(rowIndex, columnIndex)
            })
        })
    }

    private nextStatusFor(row: number, column: number): string {
        if (this.isDead(row, column)) {
            return this.matrix[row][column];
        }
        if (this.countAliveNeighbours(row, column) === 2) {
            return Status.ALIVE;
        }
        return Status.DEAD;
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

        if (this.isAlive(row - 1, column + 1)) {
            totalLivingNeighbours++;
        }

        if (this.isAlive(row + 1, column - 1)) {
            totalLivingNeighbours++;
        }

        return totalLivingNeighbours;
    }
}
