### RPS

Rock Paper Scissor engine first version.

create a CLI application in which a player logs in and can:

1. challenge an opponent:

after choosing it by his name, some stats of the opponent are shown:
- last played gamble
- win ratio
- rank (ELO score)
- most played throw

The player then submits a gamble.

2. answer to an opponent challenge:

choosing the challenge from a list, the stats of the opponent are shown (see above)
then the game ends telling the name of the winning player and the gambles

Example:
- player "Gecko" challenge "Gonzo"
- Gonzo stats are displayed

```
Last played: Rock, Rock, Rock
Win ratio: 100%
Rank: #1
Most played: Rock
```

- player "Gecko" submits: Scissors, Scissors, Paper
- player "Gonzo" logs in and answer challenge from "Gecko", submitting Scissors, Paper, Rock
- game ends with:
-
```
Gecko WINS with Scissors, Scissors, Paper! 
```

#### Concepts

- Gamble: a set of three throws
- Throw: can be Rock, Paper or Scissors (obviously)
- Game: 2 players challenging each other with a gamble

### Commands available through `npm run`
- `test`, `test:w`,
- `typecheck` or `tc`, `typecheck:w` or `tc:w`
