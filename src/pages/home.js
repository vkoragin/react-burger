import BurgerIngredients from '../components/burger-ingredients/burger-ingredients.js'
import BurgerConstructor from '../components/burger-constructor/burger-constructor.js'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styles from './home.module.css'
import { useSelector } from 'react-redux'

export function HomePage() {
  const { ingredientsRequest, ingredientsFailed } = useSelector(store => store.ingredients)

  if (ingredientsFailed) return <p className="text text_type_main-default text_color_inactive">Произошла ошибка при получении данных</p>
  else if (ingredientsRequest) return <p className="text text_type_main-default text_color_inactive">Загрузка данных...</p>
  else {
    return (
      <>
        <header className={ styles.header }>
          <h1 className='text text_type_main-large pt-8 pb-6'>Соберите бургер</h1>
        </header>
        <section className={ styles.content }>
          <DndProvider backend={ HTML5Backend }>
              <BurgerIngredients/>
              <BurgerConstructor/>
          </DndProvider>
        </section>
      </>    
    )
  } 
}