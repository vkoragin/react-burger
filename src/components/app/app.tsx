import styles from './app.module.css'
import AppHeader from '../app-header/app-header.js'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js'
import BurgerConstructor from '../burger-constructor/burger-constructor.js'
import { ingredients } from '../../utils/data.js' 

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <main className={ styles.main }>
        <header className={ styles.header }>
          <h1 className='text text_type_main-large pt-8 pb-6'>Соберите бургер</h1>
        </header>
        <section className={ styles.content }>
          <BurgerIngredients/>
          <BurgerConstructor 
            ingredients={ [ingredients[0], ingredients[1], ingredients[2], ingredients[6], ingredients[1], ingredients[2], ingredients[2]] }/>
        </section>
      </main>
    </div>
  )
}

export default App
