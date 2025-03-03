import { FC, MouseEvent, useEffect } from 'react';

import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
  onCloseByClick: (e?: MouseEvent) => void;
  onCloseByKeyDown: (e?: KeyboardEvent) => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ onCloseByClick, onCloseByKeyDown }) => {
  const handleClose = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onCloseByKeyDown(e);
  };

  useEffect(() => {
    window.addEventListener('keydown', (e) => handleClose(e));
    return () => window.removeEventListener('keydown', (e) => handleClose(e));
  });

  return <div className={styles.overlay} onClick={onCloseByClick} aria-hidden="true" />;
};

export default ModalOverlay;
