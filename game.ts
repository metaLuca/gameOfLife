import {Status} from "./status";
import {Board} from "./board";
import {Position} from "./position";

export class Game {
    private readonly board: Board;

    constructor(board: Board) {
        this.board = board;
    }

    next(): Board {
        this.board.nextGeneration(position => this.nextCellStatus(position));
        return this.board
    }

    private nextCellStatus(position: Position): Status {
        if (this.shouldStayAlive(position) || this.shouldBecomeAlive(position)) {
            return Status.ALIVE;
        }

        return Status.DEAD;
    }

    private shouldBecomeAlive(position: Position) {
        const aliveNeighbours = this.countAliveNeighbours(position);
        return this.board.isDead(position) && aliveNeighbours === 3;
    }

    private shouldStayAlive(position: Position) {
        const aliveNeighbours = this.countAliveNeighbours(position);
        return this.board.isAlive(position) && (aliveNeighbours === 2 || aliveNeighbours == 3);
    }

    private countAliveNeighbours(position: Position) {
        return this.count(position.neighbours(), position => this.board.isAlive(position));
    }

    private count(neighbours: Array<Position>, condition: (position: Position) => boolean): number {
        return neighbours.reduce((acc, position: Position) => {
            acc += condition(position) ? 1 : 0;
            return acc;
        }, 0);
    }
}
