import { test, expect } from "@jest/globals"

const ROCK = "R"
const PAPER = "P"
const SCISSORS = "S"

const resolveThrow = (opponentThrow: string, playerThrow: string) => {
    switch (opponentThrow) {
        case ROCK:
            if (playerThrow === PAPER) return "Player point"
            if (playerThrow === ROCK) return "Draw"
            break
        case PAPER:
            if (playerThrow === SCISSORS) return "Player point"
            if (playerThrow === PAPER) return "Draw"
            break
        case SCISSORS:
            if (playerThrow === ROCK) return "Player point"
            if (playerThrow === SCISSORS) return "Draw"
    }

    return "Opponent point"
}

test.each([
    [ROCK, PAPER],
    [SCISSORS, ROCK],
    [PAPER, SCISSORS]
])("win", (opponentThrow: string, playerThrow: string) => {
    expect(resolveThrow(opponentThrow, playerThrow)).toEqual("Player point")
})

test.each([
    [SCISSORS, PAPER],
    [PAPER, ROCK],
    [ROCK, SCISSORS],
])("lose", (opponentThrow: string, playerThrow: string) => {
    expect(resolveThrow(opponentThrow, playerThrow)).toEqual("Opponent point")
})

test.each([
    [PAPER, PAPER],
    [ROCK, ROCK],
    [SCISSORS, SCISSORS],
])("draw", (opponentThrow: string, playerThrow: string) => {
    expect(resolveThrow(opponentThrow, playerThrow)).toEqual("Draw")
})

interface QualcosaInbound {
    playGamble(gamble: string[]): string
}


interface ChallengeCatalog {
    getCurrentChallenge(): Challenge
}

class RPS implements QualcosaInbound {
    private challengeCatalog: ChallengeCatalog

    constructor(challengeCatalog: ChallengeCatalog) {
        this.challengeCatalog = challengeCatalog
    }

    playGamble(gamble: string[]): string {
        let playerPoints = 0
        let opponentPoints = 0

        for (let i = 0; i < 3; i++) {
            const playerGamble = gamble[i]!
            const opponentGamble = this.challengeCatalog.getCurrentChallenge().opponentGamble[i]!
            const result = resolveThrow(opponentGamble, playerGamble)
            playerPoints += result === "Player point" ? 1 : 0
            opponentPoints += result === "Opponent point" ? 1 : 0
        }
        if (opponentPoints === playerPoints) return "draw!"

        return playerPoints >= 2 ? "player wins!" : "computer wins!"
    }

}

type Challenge = { opponentGamble: string[]; opponent: string; player: string }

class InMemoryChallengeCatalog implements ChallengeCatalog {
    private challenges: Challenge[]

    constructor(challenges: Challenge[]) {
        this.challenges = challenges
    }

    getCurrentChallenge(): Challenge {
        return this.challenges[0]!
    }

}

test("single game, vs computer, player wins", () => {
    // prepare challenge
    const currentChallenge = {
        player: "me",
        opponent: "computer",
        opponentGamble: [ROCK, ROCK, ROCK],
    }
    const challengeCatalog = new InMemoryChallengeCatalog([currentChallenge])

    const app = new RPS(challengeCatalog)
    // submit gamble
    const results = app.playGamble([PAPER, PAPER, PAPER])
    // show results
    expect(results).toEqual("player wins!")
})

test("single game, vs computer, computer wins", () => {
    // prepare challenge
    const currentChallenge = {
        player: "me",
        opponent: "computer",
        opponentGamble: [ROCK, ROCK, ROCK],
    }
    const challengeCatalog = new InMemoryChallengeCatalog([currentChallenge])

    const app = new RPS(challengeCatalog)
    // submit gamble
    const results = app.playGamble([SCISSORS, SCISSORS, SCISSORS])
    // show results
    expect(results).toEqual("computer wins!")
})

test("single game, vs computer, draw", () => {
    // prepare challenge
    const currentChallenge = {
        player: "me",
        opponent: "computer",
        opponentGamble: [ROCK, PAPER, SCISSORS],
    }
    const challengeCatalog = new InMemoryChallengeCatalog([currentChallenge])

    const app = new RPS(challengeCatalog)
    // submit gamble
    const results = app.playGamble([ROCK, PAPER, SCISSORS])
    // show results
    expect(results).toEqual("draw!")
})
