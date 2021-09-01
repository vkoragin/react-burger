import { Link } from 'react-router-dom'
import styles from './not-found.module.css'

export const NotFound404 = () => {
  return (
    <div className={styles.container}>
      <p className="text text_type_digits-large">404</p>
        <br />
        <Link to='/' className={styles.link}>Перейти на главную страницу</Link>
    </div>
  );
}; 