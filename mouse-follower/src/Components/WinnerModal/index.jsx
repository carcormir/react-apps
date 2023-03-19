import './Modal.css'
import ReactDOM from 'react-dom'

function Modal ({ children, onClose, result }) {
  return (
    <div className={result ? 'modal-winner' : 'modal-loser'}>
      <div className='modal-content'>
        <span className='modal-message'>{children}</span>
        <button className='btn-close' onClick={onClose}>
          Restart the Game!
        </button>
      </div>
    </div>
  )
}

export default function ModalPortal ({ children, onClose, result }) {
  return ReactDOM.createPortal(
    <Modal onClose={onClose} result={result}>{children}</Modal>,
    document.getElementById('root-modal')
  )
}
