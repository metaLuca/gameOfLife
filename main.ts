import {Game} from "./game";
import {Board} from "./board";
import {Status} from "./status";

function main () {
    const ALIVE = Status.ALIVE;
    const DEAD = Status.DEAD;

    const game = new Game(new Board([
        [DEAD, ALIVE, DEAD],
        [DEAD, ALIVE, DEAD],
        [DEAD, ALIVE, DEAD]
    ]))

    let i = 1
    setInterval(() => {
        console.log("\u001b[H\u001b[2J")
        console.log("GENERATION", i)
        game.next().forEach(arr => {
            console.log(arr)
        })
        console.log("-----------------")
        i += 1
    }, 1000)
}

main()
