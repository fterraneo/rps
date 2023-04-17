## TODO

- prepare players repo
- prepare challenges repo

- read players repo
- select current player
- read challenges repo
- list challenges
- chose a challenge
- show opponent stats

- submit gamble
- show results

- update challenges repo

### Testlist

opponent throw R -> throw(P) -> "player point"
opponent throw R -> throw(R) -> "draw"
opponent throw R -> throw(S) -> "opponent point"
    

opponent gamble [R,P,S] -> play([P,S,R]) -> "you win"
opponent gamble [R,R,R] -> play([R,P,S]) -> "draw"
opponent gamble [R,R,R] -> play([S,S,S]) -> "you lose"
