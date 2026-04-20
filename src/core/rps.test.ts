import { expect, test } from "@jest/globals"
import { Challenge, ChallengeCatalog, RockPaperScissorsGame } from "./rps"
import { Throw } from "./throw"

class InMemoryChallengeCatalog implements ChallengeCatalog {
    private challenges: Challenge[]

    constructor(challenges: Challenge[]) {
        this.challenges = challenges
    }

    getCurrentChallenge(): Challenge {
        return this.challenges[0]!
    }

}

test("single game, vs challenger, opponent wins", () => {
    // prepare challenge
    const currentChallenge = {
        player: "me",
        opponent: "computer",
        opponentGamble: [Throw.ROCK, Throw.ROCK, Throw.ROCK],
    }
    const challengeCatalog = new InMemoryChallengeCatalog([currentChallenge])

    const app = new RockPaperScissorsGame(challengeCatalog)
    // submit gamble
    const results = app.playGamble([Throw.PAPER, Throw.PAPER, Throw.PAPER])
    // show results
    expect(results).toEqual("player wins!")
})

test("single game, vs challenger, challenger wins", () => {
    // prepare challenge
    const currentChallenge = {
        player: "me",
        opponent: "computer",
        opponentGamble: [Throw.ROCK, Throw.ROCK, Throw.ROCK],
    }
    const challengeCatalog = new InMemoryChallengeCatalog([currentChallenge])

    const app = new RockPaperScissorsGame(challengeCatalog)
    // submit gamble
    const results = app.playGamble([Throw.SCISSORS, Throw.SCISSORS, Throw.SCISSORS])
    // show results
    expect(results).toEqual("computer wins!")
})

test("single game, vs challenger, draw", () => {
    // prepare challenge
    const currentChallenge = {
        player: "me",
        opponent: "computer",
        opponentGamble: [Throw.ROCK, Throw.PAPER, Throw.SCISSORS],
    }
    const challengeCatalog = new InMemoryChallengeCatalog([currentChallenge])

    const app = new RockPaperScissorsGame(challengeCatalog)
    // submit gamble
    const results = app.playGamble([Throw.ROCK, Throw.PAPER, Throw.SCISSORS])
    // show results
    expect(results).toEqual("draw!")
})
