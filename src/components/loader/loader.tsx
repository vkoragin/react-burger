import React, { FC } from 'react';
import ReactDOM from 'react-dom';

import LoaderOverlay from '../loader-overlay/loader-overlay';

import styles from './loader.module.css';

const loaderRoot = document.getElementById('loader') as HTMLElement;

interface ILoaderProps {
  text: string;
}

const Loader: FC<ILoaderProps> = ({ text }) => {
  return ReactDOM.createPortal(
    <>
      <div className={styles.loader}>
        <p className="text text_type_main-default">{text}</p>
      </div>
      <LoaderOverlay />
    </>,
    loaderRoot,
  );
};

export default Loader;
