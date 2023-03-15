import { WINNER_COMBOS } from '../constants'

export const checkWinner = (boardToCheck) => {
  // check if there is a winner
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }
  // no winner
  return null
}

export const checkEndGame = (boardToCheck) => {
  return boardToCheck.every((square) => square !== null)
}
