import React, { FC } from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
  // eslint-disable-next-line
  onCloseByClick: (e?: React.MouseEvent) => void;
  // eslint-disable-next-line
  onCloseByKeyDown: (e?: KeyboardEvent) => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({
  onCloseByClick,
  onCloseByKeyDown,
}) => {
  const handleClose = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onCloseByKeyDown(e);
  };

  React.useEffect(() => {
    window.addEventListener('keydown', (e) => handleClose(e));
    return () =>
      window.removeEventListener('keydown', (e) => handleClose(e));
  });

  return (
    <div
      className={styles.overlay}
      onClick={onCloseByClick}
      aria-hidden="true"
    />
  );
};

export default ModalOverlay;
