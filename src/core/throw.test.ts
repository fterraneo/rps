import { expect, test } from "@jest/globals"
import { PAPER, resolveThrow, ROCK, SCISSORS, ThrowResult } from "./throw"

test.each([
    [ROCK, PAPER],
    [SCISSORS, ROCK],
    [PAPER, SCISSORS]
])("win", (opponentThrow: string, playerThrow: string) => {
    expect(resolveThrow(opponentThrow, playerThrow)).toEqual(
        ThrowResult.PLAYER_POINT,
    )
})

test.each([
    [SCISSORS, PAPER],
    [PAPER, ROCK],
    [ROCK, SCISSORS],
])("lose", (opponentThrow: string, playerThrow: string) => {
    expect(resolveThrow(opponentThrow, playerThrow)).toEqual(
        ThrowResult.OPPONENT_POINT,
    )
})

test.each([
    [PAPER, PAPER],
    [ROCK, ROCK],
    [SCISSORS, SCISSORS],
])("draw", (opponentThrow: string, playerThrow: string) => {
    expect(resolveThrow(opponentThrow, playerThrow)).toEqual(ThrowResult.DRAW)
})
