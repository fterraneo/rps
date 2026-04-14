import { createInterface } from "node:readline/promises"
import { stdin as input, stdout as output } from "node:process"
import { Command } from "commander"


async function runShell() {

    const program = new Command()
        .name("rps-poc")
        .exitOverride()
        .configureOutput({
            writeErr: (str) => output.write(str),
        })

    program
        .command("Hi")
        .action(() => {
            output.write("Hello!\n")
        })

    program
        .command("quit")
        .action(() => {
            running = false
            output.write("Bye!\n")
        })

    const rl = createInterface({ input, output })
    let running = true

    while (running) {
        const line = (await rl.question("rps> ")).trim()
        if (!line) continue

        const args = line.split(/\s+/)

        try {
            await program.parseAsync(args, { from: "user" })
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Unknown error"
            output.write(`Error: ${msg}\n`)
        }
    }

    rl.close()
}

runShell().catch((e) => {
    console.error(e)
    process.exit(1)
})

