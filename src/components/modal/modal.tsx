import React, { FC } from 'react';
import ReactDOM from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

const modalRoot = document.getElementById('modals') as HTMLElement;

interface IModalProps {
  // eslint-disable-next-line
  onCloseByClick: (e?: React.MouseEvent) => void;
  // eslint-disable-next-line
  onCloseByKeyDown: (e?: KeyboardEvent) => void;
  children: React.ReactNode;
}

const Modal: FC<IModalProps> = ({
  onCloseByClick,
  onCloseByKeyDown,
  children,
}) => {
  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div
          className={styles.close}
          onClick={onCloseByClick}
          aria-hidden="true"
        >
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
      <ModalOverlay
        onCloseByClick={onCloseByClick}
        onCloseByKeyDown={onCloseByKeyDown}
      />
    </>,
    modalRoot,
  );
};

export default Modal;
