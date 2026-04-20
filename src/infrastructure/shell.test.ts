import * as td from 'testdouble'
import { expect, test } from "@jest/globals"
import { Readable, Writable } from "node:stream"
import { RPSEngine } from "../core/rps"
import { RPSShell } from "./shell"


class InMemoryWritable extends Writable {
    public chunks: Buffer[] = []

    override _write(
        chunk: Buffer | string,
        _encoding: BufferEncoding,
        callback: (error?: Error | null) => void,
    ) {
        this.chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
        callback()
    }

    asText(): string {
        return Buffer.concat(this.chunks).toString("utf8")
    }
}


test("should handle sample commands", async () => {
    const output = new InMemoryWritable()
    const errors = new InMemoryWritable()

    const fakeGame: RPSEngine = td.object<RPSEngine>()
    const shell = new RPSShell(fakeGame)

    await shell.run(Readable.from(["Hi\n", "quit\n"]), output, errors)

    expect(output.asText()).toContain("Hello!")
    expect(output.asText()).toContain("Bye!")
})
