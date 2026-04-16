import { expect, test } from "@jest/globals"
import { runShell } from "./shell"
import { Readable, Writable } from "node:stream"

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

    await runShell(Readable.from(["Hi\n", "quit\n"]), output, errors)

    expect(output.asText()).toContain("Hello!")
    expect(output.asText()).toContain("Bye!")
})
