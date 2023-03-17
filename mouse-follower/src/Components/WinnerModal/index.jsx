import './Modal.css'
import ReactDOM from 'react-dom'

function Modal ({ children, onClose }) {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='modal-message'>{children}</span>
        <button className='btn-close' onClick={onClose}>
          Restart the Game!
        </button>
      </div>
    </div>
  )
}

export default function ModalPortal ({ children, onClose }) {
  return ReactDOM.createPortal(
    <Modal onClose={onClose}>{children}</Modal>,
    document.getElementById('root-modal')
  )
}
