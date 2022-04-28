import {Board, Status} from "./types";

export class NewBoard {
    public readonly board: Board;

    constructor(board:  Board) {
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
}