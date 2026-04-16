import { resolveThrow, ThrowResult } from "./throw"

export type Challenge = { opponentGamble: string[]; opponent: string; player: string }

export interface ChallengeCatalog {
    getCurrentChallenge(): Challenge
}

export class RockPaperScissorsGame {
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
