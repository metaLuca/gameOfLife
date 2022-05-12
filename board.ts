import {Status} from "./status";
import {Position} from "./position";
import {Generation} from "./game";

export class Board {
    private _generation: Generation;

    constructor(board: Generation) {
        this._generation = board;
    }

    get generation(): Generation {
        return this._generation;
    }

    public isAlive(position: Position) {
        if (!this._generation[position.row]) {
            return false;
        }
        return this._generation[position.row][position.column] === Status.ALIVE;
    }

    public isDead(position: Position) {
        return !this.isAlive(position);
    }

    public nextGeneration(callback: (position: Position) => Status) {
        this._generation = this._generation.map((rowStatus, row) => {
            return rowStatus.map((columnStatus, column) => {
                return callback(new Position(row, column));
            });
        })
    }
}
