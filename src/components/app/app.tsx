import React from 'react'
import styles from './app.module.css'
import AppHeader from '../app-header/app-header.js'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js'
import BurgerConstructor from '../burger-constructor/burger-constructor.js'

export default function App() {
  const url = 'https://norma.nomoreparties.space/api/ingredients'
  const [ingredients, setIngredients] = React.useState([])
  const [error, setError] = React.useState(false)
  const [load, setLoad] = React.useState(false)

  React.useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(ingredients => setIngredients(ingredients.data))
    .catch(() => setError(true))
    .finally(() => setLoad(false))
  }, [])

  return (
    <div className="App">
      <AppHeader/>
      <main className={ styles.main }>
        <header className={ styles.header }>
          <h1 className='text text_type_main-large pt-8 pb-6'>Соберите бургер</h1>
        </header>
        {
          load 
            ? <p className="text text_type_main-default text_color_inactive">Загрузка...</p>
            : error
              ? <p className="text text_type_main-default text_color_inactive">Ошибка загрузки</p>
              : !ingredients.length
                  ? <p className="text text_type_main-default text_color_inactive">Ингредиенты не найдены</p>
                  : <section className={ styles.content }>
                      <BurgerIngredients ingredients={ ingredients }/>
                      <BurgerConstructor ingredients={ ingredients }/>
                    </section>
        }
      </main>
    </div>
  )
}
