import {Game} from "./game";
import {Board} from "./board";
import {Status} from "./status";

function main () {
    const ALIVE = Status.ALIVE;
    const DEAD = Status.DEAD;

    const game = new Game(new Board([
        [ALIVE, ALIVE, ALIVE],
        [DEAD, DEAD, DEAD],
        [DEAD, DEAD, DEAD]
    ]))

    let i = 1
    setInterval(() => {
        console.log("GENERATION", i)
        console.log(game.next())
        console.log("-----------------")
        i += 1
    }, 1000)
}

main()
