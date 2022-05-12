import {Status} from "../status";
import {Generation} from "../game";
import {CliPrinter} from "../cliPrinter";

describe("Cli Printer", () => {
    const ALIVE = Status.ALIVE;
    const DEAD = Status.DEAD;
    let logCalls: any[] = []
    let printer: CliPrinter;

    beforeEach(() => {
        logCalls = []
        printer = new CliPrinter((message) => logCalls.push(message))
    })

    it("cli printer should clear the cli on each generation", () => {
        const generation: Generation = [
            [DEAD, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD]
        ];

        printer.print(0, generation)

        expect(logCalls).toContain("\u001b[H\u001b[2J")
    });

    it("cli printer should print title on each generation", () => {
        const generation: Generation = [
            [DEAD, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD]
        ];

        printer.print(0, generation)

        expect(logCalls).toContain("GENERATION 0")
    });

    it("cli printer should print the generation with squares", () => {
        const generation: Generation = [
            [DEAD, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD],
            [DEAD, ALIVE, DEAD]
        ];

        printer.print(0, generation)

        expect(logCalls).toContain(
            "⬛ ⬜ ⬛\n" +
            "⬛ ⬜ ⬛\n" +
            "⬛ ⬜ ⬛"
        )
    });
})
