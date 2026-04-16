import { stdin, stdout, stderr } from "node:process"
import { runShell } from "./infrastructure/shell"

runShell(stdin, stdout, stderr).catch((e) => {
    console.error(e)
    process.exit(1)
})
