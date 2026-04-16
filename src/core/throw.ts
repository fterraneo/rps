export const ROCK = "R"
export const PAPER = "P"
export const SCISSORS = "S"

export enum ThrowResult {
    DRAW = "Draw",
    PLAYER_POINT = "Player point",
    OPPONENT_POINT = "Opponent point",
}

export const resolveThrow = (opponentThrow: string, playerThrow: string) => {
    switch (opponentThrow) {
        case ROCK:
            if (playerThrow === PAPER) return ThrowResult.PLAYER_POINT
            if (playerThrow === ROCK) return ThrowResult.DRAW
            break
        case PAPER:
            if (playerThrow === SCISSORS) return ThrowResult.PLAYER_POINT
            if (playerThrow === PAPER) return ThrowResult.DRAW
            break
        case SCISSORS:
            if (playerThrow === ROCK) return ThrowResult.PLAYER_POINT
            if (playerThrow === SCISSORS) return ThrowResult.DRAW
    }

    return ThrowResult.OPPONENT_POINT
}
