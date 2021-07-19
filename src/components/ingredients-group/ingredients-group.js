import React from 'react'
import PropTypes from 'prop-types'
import Ingredient from '../ingredient/ingredient.js'
import styles from './ingredients-group.module.css'

const ingredients = PropTypes.shape(
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

export default class IngredientsGroup extends React.Component {
  render() {
    return (
      <section className={ styles.group }>
        <header className={'text text_type_main-medium ' + this.props.anchor}>
            {this.props.header}
        </header>
        <section className={ styles.ingredients }>            
          {this.props.ingredients.map(ingredient => <Ingredient key={ingredient['_id']} ingredient={ingredient}/>)}
        </section>
      </section>
    )
  }
}

IngredientsGroup.propTypes = {
  ingredients: PropTypes.arrayOf(ingredients.isRequired),
  anchor: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired
}
