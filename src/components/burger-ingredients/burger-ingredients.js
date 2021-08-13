import { useEffect } from 'react'
import Tabs from '../tabs/tabs.js'
import IngredientsGroup from '../ingredients-group/ingredients-group.js'
import styles from './burger-ingredients.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getIngredients } from '../../services/actions/burger-ingredients.js'
import { setActiveTab } from '../../services/actions/burger-ingredients.js'
import { useInView } from 'react-intersection-observer'

export default function BurgerIngredients () {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(store => store.ingredients)

  const dispatch = useDispatch()

  useEffect(() => dispatch(getIngredients()), [dispatch])
  
  const [bun, inViewBun] = useInView({threshold: 0.3})
  const [sauce, inViewSauce] = useInView({threshold: 0.3})
  const [main, inViewMain] = useInView({threshold: 0})

  useEffect(() => {
    if (inViewBun) dispatch(setActiveTab('Булки'))
    else if (inViewSauce) dispatch(setActiveTab('Соусы'))
    else if (inViewMain) dispatch(setActiveTab('Начинки'))
  })

  if (ingredientsFailed) return <p className="text text_type_main-default text_color_inactive">Произошла ошибка при получении данных</p>
  else if (ingredientsRequest) return <p className="text text_type_main-default text_color_inactive">Загрузка...</p>
  else {
    return (
      <div>
        <Tabs ingredientsTypes={['Булки', 'Соусы', 'Начинки']}/>
        <div className={ styles.ingredients }>
          <div ref={bun}>
            <IngredientsGroup ingredients={ingredients.filter(ingredient => ingredient.type === 'bun')}
                              anchor={'bun'}
                              header={'Булки'}/>
          </div>                 
          <div ref={sauce}>
            <IngredientsGroup ingredients={ingredients.filter(ingredient => ingredient.type === 'sauce')}
                              anchor={'sauce'}
                              header={'Соусы'}/>
          </div>
          <div ref={main}>
            <IngredientsGroup ingredients={ingredients.filter(ingredient => ingredient.type === 'main')}
                              anchor={'main'}
                              header={'Начинки'}/>
          </div>
        </div>       
      </div>
    )
  }
}
