import {Status} from "./status";
import {CliPrinter} from "./cliPrinter";
import {Game, Generation} from "./game";

function loop(interval: number, startingGeneration: Generation) {
    const printer = new CliPrinter(console.log)
    const game = new Game(startingGeneration)

    let i = 0
    printer.print(i, startingGeneration)
    setInterval(() => {
        i += 1
        printer.print(i, game.next())
    }, interval)
}

loop(1000, [
    [Status.DEAD, Status.DEAD, Status.DEAD, Status.DEAD, Status.DEAD],
    [Status.DEAD, Status.DEAD, Status.ALIVE, Status.DEAD, Status.DEAD],
    [Status.DEAD, Status.DEAD, Status.ALIVE, Status.DEAD, Status.DEAD],
    [Status.DEAD, Status.DEAD, Status.ALIVE, Status.DEAD, Status.DEAD],
    [Status.DEAD, Status.DEAD, Status.DEAD, Status.DEAD, Status.DEAD]
])
