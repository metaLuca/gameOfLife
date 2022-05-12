import {Status} from "./types";

//TODO use Position instead of row column
export interface Position {
    row: number;
    column: number;
}

export class Board {
    private readonly board: Array<Array<Status>>;

    constructor(board: Array<Array<Status>>) {
        this.board = board;
    }

    public isAlive(position: Position) {
        if (!this.board[position.row]) {
            return false;
        }
        return this.board[position.row][position.column] === Status.ALIVE;
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
