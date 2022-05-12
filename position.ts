export class Position {
    readonly row: number;
    readonly column: number;

    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;
    }

    neighbours() {
        return [
            new Position(this.row - 1, this.column - 1),
            new Position(this.row - 1, this.column),
            new Position(this.row - 1, this.column + 1),
            new Position(this.row, this.column - 1),
            new Position(this.row, this.column + 1),
            new Position(this.row + 1, this.column - 1),
            new Position(this.row + 1, this.column),
            new Position(this.row + 1, this.column + 1)
        ]
    }

}
