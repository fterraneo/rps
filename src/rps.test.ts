import { expect, test } from "@jest/globals"
import { PAPER, ROCK, SCISSORS } from "./throw"
import { Challenge, ChallengeCatalog, RockPaperScissorsGame } from "./rps"

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
