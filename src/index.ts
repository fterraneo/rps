import { stderr, stdin, stdout } from "node:process"
import { RPSShell } from "./infrastructure/shell"
import { Challenge, ChallengeCatalog, RPSEngine, RockPaperScissorsGame } from "./core/rps"
import { ROCK } from "./core/throw"

class InMemoryChallengeCatalog implements ChallengeCatalog {
    private challenges: Challenge[]

    constructor(challenges: Challenge[]) {
        this.challenges = challenges
    }

    getCurrentChallenge(): Challenge {
        return this.challenges[0]!
    }
}

const challengeCatalog: ChallengeCatalog = new InMemoryChallengeCatalog([
    {
        player: "me",
        opponent: "computer",
        opponentGamble: [ROCK, ROCK, ROCK],
    },
])


const rpsGame: RPSEngine = new RockPaperScissorsGame(challengeCatalog)
const shell = new RPSShell(rpsGame)

shell.run(stdin, stdout, stderr).catch((e) => {
    console.error(e)
    process.exit(1)
})
