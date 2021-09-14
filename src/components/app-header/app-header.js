import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'
import { NavLink, useLocation } from 'react-router-dom'

export default function AppHeader() {
    const location = useLocation()
    
    return (
        <div className={ styles.wrapper }>
          <header className={ styles.header }>
              <nav className='nav'>
                  <ul className={ styles.list }>
                      <li className={ styles.navItem }>
                        <BurgerIcon type={ location.pathname === '/' ? 'primary' : 'secondary'}/>
                        <NavLink
                            exact={true}
                            to={`/`}
                            className='text text_type_main-default text_color_inactive pl-2'
                            activeClassName={styles.active}>Конструктор</NavLink>
                      </li>
                      <li className={ styles.navItem }>
                          <ListIcon type={ location.pathname === '/feed' ? 'primary' : 'secondary'}/>
                          <NavLink
                            exact={true}
                            to={`/feed`}
                            className='text text_type_main-default text_color_inactive pl-2'
                            activeClassName={styles.active}>Лента заказов</NavLink>
                      </li>
                  </ul>
              </nav>
              <section className={ styles.logo }>
                  <Logo /> 
              </section>                               
              <section className={ styles.profile }>
                  <ProfileIcon type={ ~location.pathname.indexOf('/profile') ? 'primary' : 'secondary'}/>
                  <NavLink
                        to={`/profile`}
                        className='text text_type_main-default text_color_inactive pl-2'
                        activeClassName={styles.active}>Личный кабинет</NavLink>
              </section>
          </header>
        </div>
    )
}
