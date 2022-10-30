import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import {
  NavLink,
  useHistory,
  useRouteMatch,
  useLocation,
  Switch,
} from 'react-router-dom';

import { logoutUser } from '../services/actions/auth';

import Profile from '../components/profile/profile';
import Orders from '../components/orders/orders';
import ProtectedRoute from '../components/protected-route';

import styles from './profile.module.css';

const ProfilePage: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(logoutUser() as any).then(() =>
      history.replace({ pathname: '/login' }),
    );
  };

  return (
    <div className={styles.profile}>
      <aside className="mr-15">
        <nav>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink
                exact
                to={`${url}`}
                className="text text_type_main-medium text_color_inactive"
                activeClassName={styles.active}
              >
                Профиль
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                exact
                to={`${url}/orders`}
                className="text text_type_main-medium text_color_inactive"
                activeClassName={styles.active}
              >
                История заказов
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <a
                href="/#"
                onClick={handleLogout}
                className="text text_type_main-medium text_color_inactive"
              >
                Выход
              </a>
            </li>
          </ul>
        </nav>
        <footer className="mt-20">
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе Вы можете
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {location.pathname === '/profile/orders'
              ? 'просмотреть свою историю заказов'
              : 'изменить свои персональные данные'}
          </p>
        </footer>
      </aside>
      <section className={styles.content}>
        <Switch>
          <ProtectedRoute exact path={`${url}`}>
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute exact path={`${url}/orders`}>
            <Orders />
          </ProtectedRoute>
        </Switch>
      </section>
    </div>
  );
};

export default ProfilePage;
