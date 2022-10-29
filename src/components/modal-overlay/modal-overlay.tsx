import React, { FunctionComponent } from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
  onClose: (e: any) => void;
}

export const ModalOverlay: FunctionComponent<IModalOverlayProps> = (
  props,
) => {
  const { onClose } = props;
  const handleClose = (e: any) => {
    if (e.keyCode === 27) onClose(e);
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleClose);
    return () => window.removeEventListener('keydown', handleClose);
  });

  return <div className={styles.overlay} onClick={onClose} />;
};
