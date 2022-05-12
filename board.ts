import {Status} from "./status";
import {Position} from "./position";

export class Board {
    private board: Array<Array<Status>>;

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

    public nextGeneration(callback: (position: Position) => Status) {
        this.board = this.board.map((rowStatus, row) => {
            return rowStatus.map((columnStatus, column) => {
                return callback(new Position(row, column));
            });
        })
    }
}
