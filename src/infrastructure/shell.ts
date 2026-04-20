import { createInterface } from "node:readline/promises"
import { Command } from "commander"
import { RPSEngine } from "../core/rps"

export class RPSShell {
    private readonly game: RPSEngine

    constructor(game: RPSEngine) {
        this.game = game
    }

    async run(
        input: NodeJS.ReadableStream,
        output: NodeJS.WritableStream,
        errors: NodeJS.WritableStream,
    ) {
        const program = new Command()
            .name("rps-poc")
            .exitOverride()
            .configureOutput({
                writeErr: (str) => errors.write(str),
            })

        program.command("Hi").action(() => {
            output.write("Hello!\n")
        })

        program.command("quit").action(() => {
            running = false
            output.write("Bye!\n")
        })

        const rl = createInterface({ input, output })
        let running = true

        output.write("rps> ")
        for await (const line of rl) {
            const args = line.trim().split(/\s+/)

            try {
                await program.parseAsync(args, { from: "user" })
            } catch (err: unknown) {
                const msg = err instanceof Error ? err.message : "Unknown error"
                errors.write(`${msg}\n`)
            }

            if (!running) break

            output.write("rps> ")
        }

        rl.close()
    }
}
