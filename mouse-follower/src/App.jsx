import { useRef, useState, useEffect } from 'react'
import './App.css'
import ModalPortal from './Components/WinnerModal'
import { WIDTH, HEIGHT, WIN_COUNT, MAX_TIME, MESSAGES } from './constants'

function App () {
  const [enable, setEnable] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0.0)
  const [timeBetweenEvents, setTimeBetweenEvents] = useState(null)
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('')
  const [showModal, setShowModal] = useState(false)

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

  // effect to create the mouse follower
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

  // effect to handle the mouse over the goal
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

  // effect to update the message and check for the win
  useEffect(() => {
    if (timeBetweenEvents > MAX_TIME) {
      setCount(0)
      setMessage(MESSAGES.lost)
      setShowModal(true)
      document.body.classList.remove('no-cursor')
    } else {
      setCount((count) => count + 1)
      setMessage('')
      setShowModal(false)
    }
    if (count > WIN_COUNT) {
      setMessage(MESSAGES.win)
      setShowModal(true)
      document.body.classList.remove('no-cursor')
    }
  }, [timeBetweenEvents])

  // effect to remove the cursor when mouse follower is enable
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enable)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enable])

  // restart the game when the button is onClick
  const handleClick = () => {
    setEnable(!enable)
    setTimeBetweenEvents(0)
    setCount(0)
    setShowModal(false)
    previousTimestampRef.current = Date.now()
  }

  const handleGameOver = () => {
    setShowModal(false)
    setEnable(!enable)
    setTimeBetweenEvents(0)
    setCount(0)
    setShowModal(false)
    previousTimestampRef.current = Date.now()
  }

  return (
    <main>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(150, 150, 255, 0.5)',
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
      <span ref={pointToWin} className='goal'>🫥</span>
      <button onClick={handleClick}>{enable ? 'Stop' : 'Start'} the game</button>
      {timeBetweenEvents !== null && (
        <div className='time-interval'>Move time: {timeBetweenEvents} ms</div>
      )}
      {/* Show a time countdown based on wintime */}
      {showModal && <ModalPortal onClose={handleGameOver}>{message}</ModalPortal>}
    </main>
  )
}

export default App
