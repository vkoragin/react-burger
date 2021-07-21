import React from 'react'
import { ingredient } from '../../types.js'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient.module.css'

export default class Ingredient extends React.Component {
  render() {
    return (
        <figure className={ styles.ingredient }>
          <Counter count={1} size="default"/>
          <p><img src={this.props.ingredient.image} alt={this.props.ingredient.name}/></p>
          <p className={ styles.price }>
            <span className='text text_type_digits-default pr-2'>
              {this.props.ingredient.price}
            </span>
            <CurrencyIcon/>
          </p>            
          <figcaption className='text text_type_main-default'>{this.props.ingredient.name}</figcaption>
        </figure>
    )
  }
}

Ingredient.propTypes = {
  ingredient: ingredient.isRequired
}
