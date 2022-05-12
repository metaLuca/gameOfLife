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
        return this.board.next(this.nextCellStatus.bind(this));
    }

    private nextCellStatus(position: Position): Status {
        let aliveNeighbours = this.countAliveNeighbours(position);

        let aliveNeighboursCount = this.board.isDead(position)
            ? BECOME_ALIVE_NEIGHBOURS_COUNTS
            : STAY_ALIVE_NEIGHBOURS_COUNTS;

        if (aliveNeighboursCount.includes(aliveNeighbours)) {
            return Status.ALIVE;
        } else {
            return Status.DEAD;
        }
    }

    private countAliveNeighbours({row, column}: Position) {
        //TODO move to position
        const neighbours = [
            [row - 1, column - 1],
            [row - 1, column],
            [row - 1, column + 1],
            [row, column - 1],
            [row, column + 1],
            [row + 1, column - 1],
            [row + 1, column],
            [row + 1, column + 1]
        ];

        return this.count(neighbours, (position: Position) => this.board.isAlive(position));
    }

    private count(positions: Array<Array<number>>, condition: (position: Position) => boolean): number {
        return positions.reduce((acc, [row, column]) => {
            acc += condition({row, column}) ? 1 : 0;
            return acc;
        }, 0);
    }
}
