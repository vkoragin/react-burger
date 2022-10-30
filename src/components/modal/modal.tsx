import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById('modals') as HTMLElement;

interface IModalProps {
  onClose: (e: any) => void;
  children: React.ReactNode;
}

const Modal: FC<IModalProps> = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.close} onClick={onClose}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot,
  );
};

export default Modal;
