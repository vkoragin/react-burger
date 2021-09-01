import { NavLink, useHistory, useRouteMatch } from 'react-router-dom'
import styles from './profile.module.css'
import { logoutUser } from '../services/actions/auth'
import { useDispatch } from 'react-redux'
import { Profile } from '../components/profile/profile'
import { Orders } from '../components/orders/orders'
import { Switch, Route } from 'react-router-dom'

export function ProfilePage() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { url } = useRouteMatch()    

    const logout = e => {
        e.preventDefault()
        dispatch(logoutUser())
        .then(() => history.replace({ pathname: '/login' }))
    } 

    return (
        <div className={ styles.profile }>
            <aside className="mr-15">
                <nav>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <NavLink exact to={`${url}`} className='text text_type_main-medium text_color_inactive' activeClassName={styles.active}>
                                Профиль
                            </NavLink>
                        </li>
                        <li className={styles.navItem}>
                            <NavLink exact to={`${url}/orders`} className='text text_type_main-medium text_color_inactive' activeClassName={styles.active}>
                                История заказов
                            </NavLink>
                        </li>
                        <li className={styles.navItem}>
                            <a href="/#" onClick={logout} className='text text_type_main-medium text_color_inactive'>
                                Выход
                            </a>
                        </li>
                    </ul>
                </nav>
                <footer className="mt-20">
                    <p className='text text_type_main-default text_color_inactive'>В этом разделе Вы можете</p>
                    <p className='text text_type_main-default text_color_inactive'>изменить свои персональные данные</p>
                </footer>
            </aside>
            <section>
                <Switch>
                    <Route exact path={`${url}`} component={Profile} />
                    <Route exact path={`${url}/orders`} component={Orders} />
                </Switch>
            </section>
        </div>
    )
}