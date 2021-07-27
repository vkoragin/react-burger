import React from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import TotalPrice from '../total-price/total-price.js'
import IngredientDetails from '../ingredient-details/ingredient-details.js'
import Modal from '../modal/modal.js'
import styles from './burger-constructor.module.css'
import PropTypes from 'prop-types'
import { ingredient } from '../../types.js'

export default function BurgerConstructor (props) {
  const [bun, setBun] = React.useState([])
  const [otherIngredients, setOtherIngredients] = React.useState([])
  const [totalPrice, setTotalPrice] = React.useState(0)
  const [visible, setVisible] = React.useState(false)
  const [currentIngredient, setCurrentIngredient] = React.useState(null)

  const onClose = () => setVisible(false)  
  const onOpen = (e, ingredient) => {
    e.stopPropagation()
    setCurrentIngredient(ingredient)
    setVisible(true)
  }

  React.useEffect(() => {
    setBun(props.ingredients.filter(ingredient => ingredient.type === 'bun')[0])
    setOtherIngredients(props.ingredients.filter(ingredient => ingredient.type !== 'bun'))
    setTotalPrice(props.ingredients.reduce((totalPrice, ingredient) => totalPrice + ingredient.price, 0)) 
  }, [props])

  return (
    <div className={styles.constructor}>
      <div className={styles.bun} onClick={e => onOpen(e, bun)}>
        <ConstructorElement
          type={'top'}
          isLocked={true} 
          text={bun.name + ' (верх)'} 
          thumbnail={bun['image_mobile']} 
          price={bun.price}/>
      </div>
      
      <div className={styles.otherIngredients}>
        {otherIngredients.map(ingredient => (
          <div key={ingredient['_id']} className={styles.other} onClick={e => onOpen(e, ingredient)}>
            <DragIcon/>
            <ConstructorElement
              isLocked={false} 
              text={ingredient.name} 
              thumbnail={ingredient['image_mobile']} 
              price={ingredient.price}/>
          </div>
        ))}   
      </div>

      <div className={styles.bun} onClick={e => onOpen(e, bun)}>
        <ConstructorElement
          type={'bottom'}
          isLocked={true} 
          text={bun.name + ' (низ)'} 
          thumbnail={bun['image_mobile']} 
          price={bun.price}/> 
      </div>
      <TotalPrice price={totalPrice}/> 
      {
        (visible && currentIngredient) && 
        <Modal onClose={onClose} header={'Детали ингредиента'}>
          <IngredientDetails ingredient={currentIngredient}/>
        </Modal>
      }   
    </div>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredient.isRequired)
}
