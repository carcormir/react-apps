import { Score } from '../Score'
import { Square } from '../Square'

export function WinnerModal ({ winner, resetGame, xScore, oScore }) {
  if (winner === null) return null

  const winnerText = winner === false ? 'Tie' : 'The winner is:'

  return (
    <section className='winner'>
      <div className='text'>
        <h2>
          {winnerText}
        </h2>
        <header className='win'>
          {winner && <Square>{winner}</Square>}
        </header>
        <Score xScore={xScore} oScore={oScore} />
        <footer>
          <button onClick={resetGame}>
            Restart
          </button>
        </footer>
      </div>
    </section>
  )
}
