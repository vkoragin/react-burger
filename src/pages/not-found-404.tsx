import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './not-found.module.css';

const NotFound404: FC = () => {
  return (
    <div className={styles.container}>
      <p className="text text_type_digits-large">404</p>
      <br />
      <Link to="/" className={styles.link}>
        Перейти на главную страницу
      </Link>
    </div>
  );
};

export default NotFound404;
