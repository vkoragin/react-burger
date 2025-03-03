import { FC, MouseEvent, ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

const modalRoot = document.getElementById('modals') as HTMLElement;

interface IModalProps {
  onCloseByClick: (e?: MouseEvent) => void;
  onCloseByKeyDown: (e?: KeyboardEvent) => void;
  children: ReactNode;
}

const Modal: FC<IModalProps> = ({ onCloseByClick, onCloseByKeyDown, children }) => {
  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.close} onClick={onCloseByClick} aria-hidden="true">
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
      <ModalOverlay onCloseByClick={onCloseByClick} onCloseByKeyDown={onCloseByKeyDown} />
    </>,
    modalRoot,
  );
};

export default Modal;
