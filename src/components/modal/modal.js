import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.css'
import PropTypes from 'prop-types'
import ModalOverlay from '../modal-overlay/modal-overlay.js'

const modalRoot = document.getElementById('modals')

export default function Modal (props) {
    const { children, onClose } = props

    return ReactDOM.createPortal (
        (
          <>
            <div className={styles.modal}>
              <div className={styles.close} onClick={onClose}><CloseIcon/></div>
                {children}
            </div>
            <ModalOverlay onClose={onClose} />
          </>
        ), 
        modalRoot
    )
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}