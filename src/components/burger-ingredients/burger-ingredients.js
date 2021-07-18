import React from 'react'
import Tabs from '../tabs/tabs.js'
import IngredientsGroup from '../ingredients-group/ingredients-group.js'
import { ingredients } from '../../utils/data.js' 
import styles from './burger-ingredients.module.css'

export default class BurgerIngredients extends React.Component {
  state = {
    buns: [],
    mains: [],
    sauces: [],
    groups: [
      {buns: 'Булки'},      
      {sauces: 'Соусы'},
      {mains: 'Начинки'},
    ],
    current: 'Булки'
  }

  componentDidMount() {
    this.setIngredients()
  }

  setIngredients() {
    this.setState(prevState => ({
      ...prevState,
      buns: ingredients.filter(ingredient => ingredient.type === 'bun'),
      mains: ingredients.filter(ingredient => ingredient.type === 'main'),
      sauces: ingredients.filter(ingredient => ingredient.type === 'sauce')
    }))
  }

  setCurrentIngredient = current => {
    this.setState(prevState => ({
      ...prevState,
      current: current
    }))
  }

  render() {
    return (
      <div>
        <Tabs ingredientsTypes={this.state.groups.map(group => Object.values(group)[0])} 
              setCurrentIngredient={this.setCurrentIngredient}/>
        <div className={ styles.ingredients }>
          {this.state.groups.map((group, i) => 
            <IngredientsGroup ingredients={this.state[Object.keys(group)[0]]}
                              anchor={Object.keys(group)[0]}
                              header={Object.values(group)[0]}
                              key={i}/>)}
        </div>       
      </div>
    )
  }
}
