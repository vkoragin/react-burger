import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

export default function AppHeader() {
    return (
        <div className={ styles.wrapper }>
          <header className={ styles.header }>
              <nav className='nav'>
                  <ul className={ styles.list }>
                      <li className={ styles.navItem }>
                          <BurgerIcon type="primary"/>
                          <span className='text text_type_main-default pl-2'>Конструктор</span>
                      </li>
                      <li className={ styles.navItem }>
                          <ListIcon type="secondary"/>
                          <span className='text text_type_main-default text_color_inactive pl-2'>Лента заказов</span>
                      </li>
                  </ul>
              </nav>
              <section className={ styles.logo }>
                  <Logo /> 
              </section>                               
              <section className={ styles.profile }>
                  <ProfileIcon type="secondary"/>
                  <span className='text text_type_main-default text_color_inactive pl-2'>Личный кабинет</span>
              </section>
          </header>
        </div>     
    )
}
