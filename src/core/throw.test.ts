import { expect, test } from "@jest/globals"
import { resolveThrow, Throw, ThrowResult } from "./throw"

test.each([
    [Throw.ROCK, Throw.PAPER],
    [Throw.SCISSORS, Throw.ROCK],
    [Throw.PAPER, Throw.SCISSORS]
])("win", (opponentThrow: Throw, playerThrow: Throw) => {
    expect(resolveThrow(opponentThrow, playerThrow)).toEqual(
        ThrowResult.PLAYER_POINT,
    )
})

test.each([
    [Throw.SCISSORS, Throw.PAPER],
    [Throw.PAPER, Throw.ROCK],
    [Throw.ROCK, Throw.SCISSORS],
])("lose", (opponentThrow: Throw, playerThrow: Throw) => {
    expect(resolveThrow(opponentThrow, playerThrow)).toEqual(
        ThrowResult.OPPONENT_POINT,
    )
})

test.each([
    [Throw.PAPER, Throw.PAPER],
    [Throw.ROCK, Throw.ROCK],
    [Throw.SCISSORS, Throw.SCISSORS],
])("draw", (opponentThrow: Throw, playerThrow: Throw) => {
    expect(resolveThrow(opponentThrow, playerThrow)).toEqual(ThrowResult.DRAW)
})
