import {Board, Status} from "./types";

export class NewBoard {
    private readonly board: Board;

    constructor(board: Board) {
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

    public next(callback: (rowIndex: number, columnIndex: number) => Status): NewBoard {
        return new NewBoard(
            this.board.map((row, rowIndex) => {
                return row.map((column, columnIndex) => {
                    return callback(rowIndex, columnIndex);
                });
            })
        );
    }
}
