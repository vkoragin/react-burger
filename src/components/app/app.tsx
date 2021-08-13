import styles from './app.module.css'
import AppHeader from '../app-header/app-header.js'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js'
import BurgerConstructor from '../burger-constructor/burger-constructor.js'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function App() {
  return (
    <div className="App">
      <AppHeader/>
      <main className={ styles.main }>
        <header className={ styles.header }>
          <h1 className='text text_type_main-large pt-8 pb-6'>Соберите бургер</h1>
        </header>
        <section className={ styles.content }>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients/>
            <BurgerConstructor/>
          </DndProvider>  
        </section>
      </main>
    </div>
  )
}
