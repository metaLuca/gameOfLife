class Game {
    constructor(matrix: Array<string>) {

    }

    next() {
        return ['.'];
    }
}

it("single live cell dies", () => {
    const matrix: Array<string> = ['*']

    const newMatrix: Array<string> = new Game(matrix).next()

    expect(newMatrix).toEqual(['.'])
});
