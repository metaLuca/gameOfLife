import {Status} from "./status";
import {Position} from "./position";
import {Generation} from "./game";

export class Board {
    private generation: Generation;

    constructor(generation: Generation) {
        this.generation = generation;
    }

    public isAlive(position: Position) {
        if (!this.generation[position.row]) {
            return false;
        }
        return this.generation[position.row][position.column] === Status.ALIVE;
    }

    public isDead(position: Position) {
        return !this.isAlive(position);
    }

    public nextGeneration(callback: (position: Position) => Status) {
        this.generation = this.generation.map((rowStatus, row) => {
            return rowStatus.map((columnStatus, column) => {
                return callback(new Position(row, column));
            });
        })
        return this.generation
    }
}
