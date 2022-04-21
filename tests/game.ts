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
        let aliveNeighbours = this.countAliveNeighbours(row, column);
        if (aliveNeighbours === 2 || aliveNeighbours === 3) {
            return Status.ALIVE;
        }
        return Status.DEAD;
    }

    private countAliveNeighbours(row: number, column: number) {
        let positions = [
            [row - 1, column - 1],
            [row - 1, column],
            [row - 1, column + 1],
            [row, column - 1],
            [row, column + 1],
            [row + 1, column - 1],
            [row + 1, column],
            [row + 1, column + 1]
        ]

        return this.count(positions, (row, column) => this.isAlive(row, column))
    }

    private count(positions: Array<Array<number>>, condition: (row: number, column: number) => boolean): number {
        return positions.reduce((acc, [row, column]) => {
            acc += condition(row, column) ? 1 : 0
            return acc
        }, 0)
    }
}
