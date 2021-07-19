import React from 'react'
import PropTypes from 'prop-types'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient.module.css'

const ingredient = PropTypes.shape(
  {
    "_id":PropTypes.string.isRequired,
    "name":PropTypes.string.isRequired,
    "type":PropTypes.string.isRequired,
    "proteins":PropTypes.number.isRequired,
    "fat":PropTypes.number.isRequired,
    "carbohydrates":PropTypes.number.isRequired,
    "calories":PropTypes.number.isRequired,
    "price":PropTypes.number.isRequired,
    "image":PropTypes.string.isRequired,
    "image_mobile":PropTypes.string.isRequired,
    "image_large":PropTypes.string.isRequired,
    "__v":PropTypes.number
 }
)

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
