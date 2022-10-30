import React, { FC } from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
  onClose: (e: any) => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ onClose }) => {
  const handleClose = (e: any) => {
    if (e.keyCode === 27) onClose(e);
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleClose);
    return () => window.removeEventListener('keydown', handleClose);
  });

  return <div className={styles.overlay} onClick={onClose} />;
};

export default ModalOverlay;
