import { useRef, useState, useEffect } from 'react'
import './App.css'

const WIDTH = window.innerWidth - 50
const HEIGHT = window.innerHeight - 50
const MAX_TIME = 2000
const WIN_COUNT = 10

function App () {
  const [enable, setEnable] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0.0)
  const [timeBetweenEvents, setTimeBetweenEvents] = useState(null)
  const [gameStatus, setGameStatus] = useState(false)
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('')

  const pointToWin = useRef(null)
  const previousTimestampRef = useRef(null)

  const getNewGoal = () => {
    const randomTop = getRandomNumber(0, HEIGHT)
    const randomLeft = getRandomNumber(0, WIDTH)
    return { randomTop, randomLeft }
  }
  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min
  }

  useEffect(() => {
    const handleMove = (evt) => {
      const { clientX, clientY } = evt
      setPosition({ x: clientX, y: clientY })
      setOpacity(0.8)
    }

    if (enable) {
      window.addEventListener('pointermove', handleMove)
    }

    return () => {
      window.removeEventListener('pointermove', handleMove)

      setOpacity(0.0)
    }
  }, [enable])

  useEffect(() => {
    const handleOver = (evt) => {
      const { randomTop, randomLeft } = getNewGoal()
      const currentTimestamp = Date.now()

      if (previousTimestampRef.current) {
        const timeDiff = currentTimestamp - previousTimestampRef.current
        setTimeBetweenEvents(timeDiff)
      }

      previousTimestampRef.current = currentTimestamp

      pointToWin.current.style.top = `${randomTop}px`
      pointToWin.current.style.left = `${randomLeft}px`
    }
    if (enable) {
      pointToWin.current.addEventListener('pointerover', handleOver)
    }
    return () => {
      pointToWin.current.removeEventListener('pointerover', handleOver)
    }
  }, [enable])

  useEffect(() => {
    document.body.classList.toggle('no-cursor', enable)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enable])

  useEffect(() => {
    if (timeBetweenEvents > MAX_TIME) {
      console.log('TOO Lateeee')
      setGameStatus(false)
      setCount(0)
      setMessage('YOU ARE TOO SLOWWWW')
    } else {
      setCount((count) => count + 1)
      setMessage('')
    }
    if (count > WIN_COUNT) {
      setGameStatus(true)
      setMessage('CONGRATULATIONS, YOU WON!')
    }
  }, [timeBetweenEvents])

  const handleClick = () => {
    setEnable(!enable)
    setTimeBetweenEvents(null)
    setGameStatus(null)
    setCount(0)
  }

  return (
    <main>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid white',
        borderRadius: '50%',
        opacity: `${opacity}`,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <span ref={pointToWin} className='goal'>🤡</span>
      <button onClick={handleClick}>{enable ? 'Stop' : 'Start'} the game</button>
      {timeBetweenEvents !== null && (
        <p>Time between events: {timeBetweenEvents} ms</p>
      )}
      <p>{message}</p>
    </main>
  )
}

export default App
