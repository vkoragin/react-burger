import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.css'
import PropTypes from 'prop-types'
import ModalOverlay from '../modal-overlay/modal-overlay.js'

const modalRoot = document.getElementById('modals')

export default function Modal (props) {
    const { children, header, onClose } = props

    return ReactDOM.createPortal (
        (
          <>
            <div className={styles.modal}>
                <header className={styles.header}>
                    <p className="text text_type_main-large">{header}</p>
                    <div className={styles.close} onClick={onClose}><CloseIcon/></div>
                </header>
                {children}
            </div>
            <ModalOverlay onClose={onClose} />
          </>
        ), 
        modalRoot
    )
}

Modal.propTypes = {
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}