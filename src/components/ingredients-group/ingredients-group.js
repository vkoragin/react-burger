import PropTypes from 'prop-types'
import Ingredient from '../ingredient/ingredient.js'
import { ingredient } from '../../types.js'
import styles from './ingredients-group.module.css'

export default function IngredientsGroup (props) {
  return (
    <section className={ styles.group }>
      <header className={'text text_type_main-medium ' + props.anchor}>
          {props.header}
      </header>
      <section className={ styles.ingredients }>            
        {props.ingredients.map(ingredient => <Ingredient key={ingredient['_id']} ingredient={ingredient}/>)}
      </section>
    </section>
  )
}

IngredientsGroup.propTypes = {
  ingredients: PropTypes.arrayOf(ingredient.isRequired),
  anchor: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired
}
