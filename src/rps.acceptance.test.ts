import { expect, test } from "@jest/globals"
import { PAPER, resolveThrow, ROCK, SCISSORS, ThrowResult } from "./throw"

interface ChallengeCatalog {
    getCurrentChallenge(): Challenge
}

class RockPaperScissorsGame {
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
            playerPoints += result === ThrowResult.PLAYER_POINT ? 1 : 0
            opponentPoints += result === ThrowResult.OPPONENT_POINT ? 1 : 0
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

    const app = new RockPaperScissorsGame(challengeCatalog)
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

    const app = new RockPaperScissorsGame(challengeCatalog)
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

    const app = new RockPaperScissorsGame(challengeCatalog)
    // submit gamble
    const results = app.playGamble([ROCK, PAPER, SCISSORS])
    // show results
    expect(results).toEqual("draw!")
})
