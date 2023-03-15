export const saveGameToStorage = ({ board, turn }) => {
  window.localStorage.setItem('board', JSON.stringify(board))
  window.localStorage.setItem('turn', JSON.stringify(turn))
}

export const resetGameStorage = () => {
  playAgainGameStorage()
  resetScoreStorage()
}

export const resetScoreStorage = () => {
  window.localStorage.removeItem('xScore')
  window.localStorage.removeItem('oScore')
}

export const playAgainGameStorage = () => {
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}
