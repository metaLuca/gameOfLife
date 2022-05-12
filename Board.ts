import {Status} from "./types";

export interface Position {
    row: number;
    column: number;
}

export class Board {
    private readonly board: Array<Array<Status>>;

    constructor(board: Array<Array<Status>>) {
        this.board = board;
    }

    public isAlive({row, column}: Position) {
        if (!this.board[row]) {
            return false;
        }
        return this.board[row][column] === Status.ALIVE;
    }

    public isDead(position: Position) {
        return !this.isAlive(position);
    }

    public next(callback: (position: Position) => Status): Board {
        return new Board(
            this.board.map((row, rowIndex) => {
                return row.map((column, columnIndex) => {
                    return callback({row: rowIndex, column: columnIndex});
                });
            })
        );
    }
}
