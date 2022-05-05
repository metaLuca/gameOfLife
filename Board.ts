import {Status} from "./types";

//TODO use Position instead of row column
interface Position {
    row: number;
    column: number;
}

export class Board {
    private readonly board: Array<Array<Status>>;

    constructor(board: Array<Array<Status>>) {
        this.board = board;
    }

    public isAlive(row: number, column: number) {
        if (!this.board[row]) {
            return false;
        }
        return this.board[row][column] === Status.ALIVE;
    }

    public isDead(row: number, column: number) {
        return !this.isAlive(row, column);
    }

    public next(callback: (rowIndex: number, columnIndex: number) => Status): Board {
        return new Board(
            this.board.map((row, rowIndex) => {
                return row.map((column, columnIndex) => {
                    return callback(rowIndex, columnIndex);
                });
            })
        );
    }
}
