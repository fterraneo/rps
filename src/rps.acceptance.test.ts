import {test, expect} from "@jest/globals"

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

test.each([["R", "P"], ["S", "R"], ["P", "S"]])("win", (opponentThrow: string, playerThrow: string) => {
    expect(resolveThrow(opponentThrow, playerThrow)).toEqual("Player point")
})


interface QualcosaInbound {
    playGamble(gamble: string[]): string
}


interface ChallengeCatalog {
    getCurrentChallenge(): Challenge
}

class RPS implements QualcosaInbound {
    private challengeCatalog: ChallengeCatalog;

    constructor(challengeCatalog: ChallengeCatalog) {
        this.challengeCatalog = challengeCatalog
    }

    playGamble(gamble: string[]): string {
        let playerPoints = 0

        for (let i = 0; i < 3; i++) {
            const playerGamble = gamble[i]!
            const opponentGamble = this.challengeCatalog.getCurrentChallenge().opponentGamble[i]!
            const result = resolveThrow(opponentGamble, playerGamble);
            playerPoints += result === "Player point" ? 1 : 0
        }

        return playerPoints >= 2 ? "player wins!" : "computer wins!"
    }

}

type Challenge = { opponentGamble: string[]; opponent: string; player: string };

class InMemoryChallengeCatalog implements ChallengeCatalog {
    private challenges: Challenge[];

    constructor(challenges: Challenge[]) {
        this.challenges = challenges
    }

    getCurrentChallenge(): Challenge {
        return this.challenges[0]!
    }

}

test('single game, vs computer, player wins', () => {
    // prepare challenge
    const currentChallenge = {
        player: "me",
        opponent: "computer",
        opponentGamble: ["R", "R", "R"]
    }
    const challengeCatalog = new InMemoryChallengeCatalog([currentChallenge])

    const app = new RPS(challengeCatalog)
    // submit gamble
    const results = app.playGamble(["P", "P", "P"])
    // show results
    expect(results).toEqual("player wins!")
});

test('single game, vs computer, computer wins', () => {
    // prepare challenge
    const currentChallenge = {
        player: "me",
        opponent: "computer",
        opponentGamble: ["R", "R", "R"]
    }
    const challengeCatalog = new InMemoryChallengeCatalog([currentChallenge])

    const app = new RPS(challengeCatalog)
    // submit gamble
    const results = app.playGamble(["S", "S", "S"])
    // show results
    expect(results).toEqual("computer wins!")
});
