import {Status} from "./types";

export interface Position {
    row: number;
    column: number;
    neighbours: () => Array<Position>
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
            this.board.map((rowStatus, row) => {
                return rowStatus.map((columnStatus, column) => {
                    const neighbours: () => Array<Position> = () => [
                        {neighbours: () => [], row: row - 1, column: column - 1},
                        {neighbours: () => [], row: row - 1, column: column},
                        {neighbours: () => [], row: row - 1, column: column + 1},
                        {neighbours: () => [], row: row, column: column - 1},
                        {neighbours: () => [], row: row, column: column + 1},
                        {neighbours: () => [], row: row + 1, column: column - 1},
                        {neighbours: () => [], row: row + 1, column: column},
                        {neighbours: () => [], row: row + 1, column: column + 1}
                    ];
                    return callback({row: row, column: column, neighbours});
                });
            })
        );
    }
}
