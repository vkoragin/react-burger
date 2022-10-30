import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import {
  Logo,
  BurgerIcon,
  ProfileIcon,
  ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';

const AppHeader = () => {
  const location = useLocation();

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <nav className="nav">
          <ul className={styles.list}>
            <li className={styles.navItem}>
              <BurgerIcon
                type={
                  location.pathname === '/' ? 'primary' : 'secondary'
                }
              />
              <NavLink
                exact
                to="/"
                className="text text_type_main-default text_color_inactive pl-2"
                activeClassName={styles.active}
              >
                Конструктор
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <ListIcon
                type={
                  location.pathname === '/feed'
                    ? 'primary'
                    : 'secondary'
                }
              />
              <NavLink
                exact
                to="/feed"
                className="text text_type_main-default text_color_inactive pl-2"
                activeClassName={styles.active}
              >
                Лента заказов
              </NavLink>
            </li>
          </ul>
        </nav>
        <section className={styles.logo}>
          <NavLink exact to="/">
            <Logo />
          </NavLink>
        </section>
        <section className={styles.profile}>
          <ProfileIcon
            type={
              location.pathname.indexOf('/profile') !== -1
                ? 'primary'
                : 'secondary'
            }
          />
          <NavLink
            to="/profile"
            className="text text_type_main-default text_color_inactive pl-2"
            activeClassName={styles.active}
          >
            Личный кабинет
          </NavLink>
        </section>
      </header>
    </div>
  );
};

export default AppHeader;
