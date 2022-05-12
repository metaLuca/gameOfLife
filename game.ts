import {Status} from "./types";
import {Board, Position} from "./Board";

const BECOME_ALIVE_NEIGHBOURS_COUNTS = [3];
const STAY_ALIVE_NEIGHBOURS_COUNTS = [2, 3];

export class Game {
    private readonly board: Board;

    constructor(board: Board) {
        this.board = board;
    }

    next(): Board {
        return this.board.next(this.nextStatusFor.bind(this));
    }

    private nextStatusFor(position: Position): Status {
        let aliveNeighbours = this.countAliveNeighbours(position.row, position.column);

        let aliveNeighboursCount = this.board.isDead(position)
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

        return this.count(positions, (row, column) => this.board.isAlive({row, column}));
    }

    private count(positions: Array<Array<number>>, condition: (row: number, column: number) => boolean): number {
        return positions.reduce((acc, [row, column]) => {
            acc += condition(row, column) ? 1 : 0;
            return acc;
        }, 0);
    }
}
