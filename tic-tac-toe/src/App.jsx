import { useState, useEffect } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './Components/Square'
import { Score } from './Components/Score'
import { TURNS } from './constants'
import { checkWinner, checkEndGame } from './logic/boards'
import { WinnerModal } from './Components/WinnerModal'
import {
  playAgainGameStorage,
  resetGameStorage,
  saveGameToStorage
} from './logic/storage'

function App () {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X
  })
  const [xScore, setXScore] = useState(() => {
    const xScoreFromStorage = window.localStorage.getItem('xScore')
    return xScoreFromStorage ? JSON.parse(xScoreFromStorage) : 0
  })
  const [oScore, setOScore] = useState(() => {
    const oScoreFromStorage = window.localStorage.getItem('oScore')
    return oScoreFromStorage ? JSON.parse(oScoreFromStorage) : 0
  })

  const [winner, setWinner] = useState(null) // null -> no winner, false -> tie,

  const updateBoard = (index) => {
    // If there is something or winner do not overwrite it
    if (board[index] || winner) return

    // update board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // update turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // update new winner
    const newWinner = checkWinner(newBoard) // we use newBoard because the states are not synchronous!
    if (newWinner) {
      confetti()
      setWinner(newWinner)
      updateScore(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  // save game
  useEffect(() => {
    saveGameToStorage({ board, turn })
  }, [board, turn])

  const updateScore = (newWinner) => {
    if (newWinner === '╳') {
      const newXScore = xScore + 1
      setXScore(newXScore)
      window.localStorage.setItem('xScore', JSON.stringify(newXScore))
    } else if (newWinner === '⃝') {
      const newOScore = oScore + 1
      setOScore(newOScore)
      window.localStorage.setItem('oScore', JSON.stringify(newOScore))
    } else {
      window.localStorage.setItem('xScore', JSON.stringify(xScore))
      window.localStorage.setItem('oScore', JSON.stringify(oScore))
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null) // null
    setXScore(0)
    setOScore(0)
    resetGameStorage()
  }

  const playAgain = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null) // null
    playAgainGameStorage()
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className='game'>
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          )
        })}
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <section className='score'>
        <Score xScore={xScore} oScore={oScore} />
      </section>
      <section>
        <WinnerModal
          winner={winner}
          resetGame={playAgain}
          xScore={xScore}
          oScore={oScore}
        />
      </section>
    </main>
  )
}

export default App
