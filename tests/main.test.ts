it("single live cell dies", () => {
    const matrix: Matrix = ['*']
    
    const newMatrix:Matrix = Game(matrix).next()
    
    expect(newMatrix).toBe(['.'])
});
