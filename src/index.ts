import { stdin, stdout } from "node:process"
import { runShell } from "./shell-poc"

runShell(stdin, stdout).catch((e) => {
    console.error(e)
    process.exit(1)
})
