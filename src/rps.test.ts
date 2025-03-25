import { test, expect } from "@jest/globals"

const resolveThrow = (opponentThrow: string, playerThrow: string) => {
    const ROCK = "R";
    const PAPER = "P";
    const SCISSORS = "S";

    if (
        opponentThrow === ROCK && playerThrow === PAPER ||
        opponentThrow === PAPER && playerThrow === SCISSORS ||
        opponentThrow === SCISSORS && playerThrow === ROCK
    )
        return "Player point";

    return "boh"
};

test.each([["R", "P"],["S", "R"],["P", "S"]])("win", (opponentThrow: string, playerThrow: string) => {
    expect(resolveThrow(opponentThrow, playerThrow)).toEqual("Player point")
})
