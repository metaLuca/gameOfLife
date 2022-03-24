class Game {
    constructor(matrix: Array<string>) {

    }

    next(): Array<string> {
        return ['.'];
    }
}

it("single live cell dies", () => {
    const matrix: Array<string> = ['*']

    const newMatrix: Array<string> = new Game(matrix).next()

    expect(newMatrix).toEqual(['.'])
});
