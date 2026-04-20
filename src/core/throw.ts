
export enum Throw {
    ROCK = "R",
    PAPER = "P",
    SCISSORS = "S"
}

export enum ThrowResult {
    DRAW = "Draw",
    PLAYER_POINT = "Player point",
    OPPONENT_POINT = "Opponent point",
}

export const resolveThrow = (opponentThrow: Throw, playerThrow: Throw) => {
    switch (opponentThrow) {
        case Throw.ROCK:
            if (playerThrow === Throw.PAPER) return ThrowResult.PLAYER_POINT
            if (playerThrow === Throw.ROCK) return ThrowResult.DRAW
            break
        case Throw.PAPER:
            if (playerThrow === Throw.SCISSORS) return ThrowResult.PLAYER_POINT
            if (playerThrow === Throw.PAPER) return ThrowResult.DRAW
            break
        case Throw.SCISSORS:
            if (playerThrow === Throw.ROCK) return ThrowResult.PLAYER_POINT
            if (playerThrow === Throw.SCISSORS) return ThrowResult.DRAW
    }

    return ThrowResult.OPPONENT_POINT
}
