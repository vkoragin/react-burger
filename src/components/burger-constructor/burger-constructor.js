import React from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import TotalPrice from '../total-price/total-price.js'
import styles from './burger-constructor.module.css'
import PropTypes from 'prop-types'

const ingredients = PropTypes.shape(
  {
    "_id":PropTypes.string.isRequired,
    "name":PropTypes.string.isRequired,
    "type":PropTypes.string.isRequired,
    "proteins":PropTypes.number.isRequired,
    "fat":PropTypes.string.isRequired,
    "carbohydrates":PropTypes.number.isRequired,
    "calories":PropTypes.number.isRequired,
    "price":PropTypes.number.isRequired,
    "image":PropTypes.string.isRequired,
    "image_mobile":PropTypes.string.isRequired,
    "image_large":PropTypes.string.isRequired,
    "__v":PropTypes.number
 }
)

export default class BurgerConstructor extends React.Component {
  state = {
    bun: [],
    otherIngredients: [],
    totalPrice: 0
  }

  componentDidMount() {
    this.setState ({
      bun: this.props.ingredients.filter(ingredient => ingredient.type === 'bun')[0],
      otherIngredients: this.props.ingredients.filter(ingredient => ingredient.type !== 'bun'),
      totalPrice: this.props.ingredients.reduce((totalPrice, ingredient) => totalPrice + ingredient.price, 0)
    })
  }

  render() {
    return (
      <div className={styles.constructor }>
          <div className={ styles.bun }>
            <ConstructorElement
                type={'top'}
                isLocked={true} 
                text={this.state.bun.name} 
                thumbnail={this.state.bun['image_mobile']} 
                price={this.state.bun.price}/>
            </div>
          
            <div className={ styles.otherIngredients }>
              {this.state.otherIngredients.map((ingredient, index) => (
                <div key={index} className={ styles.other }>
                  <DragIcon/>
                  <ConstructorElement
                      isLocked={false} 
                      text={ingredient.name} 
                      thumbnail={ingredient['image_mobile']} 
                      price={ingredient.price}/>
                </div>
              ))}   
            </div>

          <div className={ styles.bun }>
            <ConstructorElement
                type={'bottom'}
                isLocked={true} 
                text={this.state.bun.name} 
                thumbnail={this.state.bun['image_mobile']} 
                price={this.state.bun.price}/> 
          </div>
          <TotalPrice price={this.state.totalPrice}/>     
        </div>
    )
  }
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredients.isRequired)
}
