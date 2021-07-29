import React from 'react'
import Tabs from '../tabs/tabs.js'
import IngredientsGroup from '../ingredients-group/ingredients-group.js'
import PropTypes from 'prop-types'
import { ingredient } from '../../types.js'
import styles from './burger-ingredients.module.css'

export default function BurgerIngredients (props) {
  const [buns, setBuns] = React.useState([])
  const [sauces, setSauces] = React.useState([])
  const [mains, setMains] = React.useState([])

  React.useEffect(() => {
    let buns = props.ingredients.filter(ingredient => ingredient.type === 'bun')
    let sauces = props.ingredients.filter(ingredient => ingredient.type === 'sauce')
    let mains = props.ingredients.filter(ingredient => ingredient.type === 'main')
    setBuns(buns)
    setSauces(sauces)
    setMains(mains)
  }, [props])

  return (
    <div>
      <Tabs ingredientsTypes={['Булки', 'Соусы', 'Начинки']}/>
      <div className={ styles.ingredients }>
        <IngredientsGroup ingredients={buns}
                          anchor={'bun'}
                          header={'Булки'}/>
        <IngredientsGroup ingredients={sauces}
                          anchor={'sauce'}
                          header={'Соусы'}/>
        <IngredientsGroup ingredients={mains}
                          anchor={'main'}
                          header={'Начинки'}/>
      </div>       
    </div>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredient.isRequired)
}
