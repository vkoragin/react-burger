import { ingredient } from '../../types.js'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient.module.css'

export default function Ingredient (props) {
  return (
    <figure className={ styles.ingredient }>
      <Counter count={1} size="default"/>
      <p><img src={props.ingredient.image} alt={props.ingredient.name}/></p>
      <p className={ styles.price }>
        <span className='text text_type_digits-default pr-2'>
          {props.ingredient.price}
        </span>
        <CurrencyIcon/>
      </p>            
      <figcaption className='text text_type_main-default'>{props.ingredient.name}</figcaption>
    </figure>
  )
}

Ingredient.propTypes = {
  ingredient: ingredient.isRequired
}
