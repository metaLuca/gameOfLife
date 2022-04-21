export type Board = Array<Array<string>>

enum Status {
    ALIVE = "*",
    DEAD = "."
}

const BECOME_ALIVE_NEIGHBOURS_COUNTS = [3];
const STAY_ALIVE_NEIGHBOURS_COUNTS = [2, 3];

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
        let aliveNeighbours = this.countAliveNeighbours(row, column);

        let aliveNeighboursCount = this.isDead(row, column)
            ? BECOME_ALIVE_NEIGHBOURS_COUNTS
            : STAY_ALIVE_NEIGHBOURS_COUNTS;

        if(aliveNeighboursCount.includes(aliveNeighbours)) {
            return Status.ALIVE;
        } else {
            return Status.DEAD;
        }
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
