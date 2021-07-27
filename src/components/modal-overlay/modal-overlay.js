import React from 'react'
import PropTypes from 'prop-types'
import styles from './modal-overlay.module.css'

export default function ModalOverlay (props) {
    const handleClose = e => { 
        if (e.keyCode === 27) props.onClose()
    }

    React.useEffect(() => {
        window.addEventListener('keydown', handleClose)
        return () => window.removeEventListener('keydown', handleClose)
	})

    return (<div className={styles.overlay} onClick={props.onClose}></div>)
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
  }