import {Board, Status} from "./types";
import {NewBoard} from "./NewBoard";

const BECOME_ALIVE_NEIGHBOURS_COUNTS = [3];
const STAY_ALIVE_NEIGHBOURS_COUNTS = [2, 3];

export class Game {
    private readonly board: NewBoard;

    constructor(matrix: Board) {
        this.board = new NewBoard(matrix);
    }

    next(): Board {
        return this.loopCells((rowIndex: number, columnIndex: number) => this.nextStatusFor(rowIndex, columnIndex));
    }

    // TODO: Valutare se è spostabile dentro la classe NewBoard
    private loopCells(callback: (rowIndex: number, columnIndex: number) => Status) {
        return this.board.board.map((row, rowIndex) => {
            return row.map((column, columnIndex) => {
                return callback(rowIndex, columnIndex);
            });
        });
    }

    private nextStatusFor(row: number, column: number): Status {
        let aliveNeighbours = this.countAliveNeighbours(row, column);

        let aliveNeighboursCount = this.board.isDead(row, column)
            ? BECOME_ALIVE_NEIGHBOURS_COUNTS
            : STAY_ALIVE_NEIGHBOURS_COUNTS;

        if (aliveNeighboursCount.includes(aliveNeighbours)) {
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
        ];

        return this.count(positions, (row, column) => this.board.isAlive(row, column));
    }

    private count(positions: Array<Array<number>>, condition: (row: number, column: number) => boolean): number {
        return positions.reduce((acc, [row, column]) => {
            acc += condition(row, column) ? 1 : 0;
            return acc;
        }, 0);
    }
}
