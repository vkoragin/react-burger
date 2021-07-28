import React from 'react'
import { ingredient } from '../../types.js'
import Modal from '../modal/modal.js'
import IngredientDetails from '../ingredient-details/ingredient-details.js'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient.module.css'

export default function Ingredient (props) {
  const [visible, setVisible] = React.useState(false)

  const onClose = e => {
    if(e) e.stopPropagation()
    setVisible(false)
  }
  const onOpen = () => setVisible(true)

  return (
    <figure className={styles.ingredient} onClick={onOpen} >
      <Counter count={1} size="default"/>
      <p><img src={props.ingredient.image} alt={props.ingredient.name}/></p>
      <p className={ styles.price }>
        <span className='text text_type_digits-default pr-2'>
          {props.ingredient.price}
        </span>
        <CurrencyIcon/>
      </p>            
      <figcaption className='text text_type_main-default'>{props.ingredient.name}</figcaption>
      {
        visible && 
        <Modal onClose={onClose} header={'Детали ингредиента'}>
          <IngredientDetails ingredient={props.ingredient}/>
        </Modal>
      }
    </figure>
  )
}

Ingredient.propTypes = {
  ingredient: ingredient.isRequired
}
