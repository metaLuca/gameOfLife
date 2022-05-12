import {Generation} from "./game";
import {Status} from "./status";

export class CliPrinter {
    private readonly log: (message?: any) => void;

    constructor(log: (message?: any) => void) {
        this.log = log;
    }

    print(i: number, generation: Generation) {
        this.clearConsole()
        this.generationTitle(i)
        this.printGeneration(generation)
    }

    private printGeneration(generation: Generation) {
        const gen = generation.map(line => line.map(this.convert).join(" ")).join("\n")
        this.log(gen)
    }

    private convert(cell: Status) {
        return cell == Status.ALIVE ? "⬜" : "⬛"
    }

    private generationTitle(i: number) {
        this.log(`GENERATION ${i}`)
    }

    private clearConsole() {
        this.log("\u001b[H\u001b[2J")
    }
}
