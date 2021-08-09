import React, { useContext, useReducer  } from 'react'
import OrderDetails from '../order-details/order-details.js'
import Modal from '../modal/modal.js'
import PropTypes from 'prop-types'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientsContext } from '../../context/ingredientsContext.js'
import styles from './total-price.module.css'

const defaultPrice = { value: 0 }

function reducer(totalPrice, current) {
  switch (current.type) {
    case 'bun':
      return { value: totalPrice.value + current.price * 2 }
    case 'main':
    case 'sauce':
      return { value: totalPrice.value + current.price }
    default:
      throw new Error(`Wrong type of action: ${current.type}`)
  }
}

export default function TotalPrice () {
  const [visible, setVisible] = React.useState(false)
  const ingredients = useContext(IngredientsContext)
  const [totalPrice, dispatch] = useReducer(reducer, defaultPrice)

  const onClose = () => setVisible(false)
  const onOpen = () => setVisible(true)

  React.useEffect(() => ingredients.map(ingredient => dispatch({ type: ingredient.type, price: ingredient.price })), [ingredients])

  return (
    <>
      <div className={ styles.totalPrice }>
        <span className='text text_type_digits-medium pr-2'>{totalPrice.value}</span>
        <CurrencyIcon/>
        <p className='ml-10'>
          <Button onClick={onOpen} type='primary' size='medium'>Оформить заказ</Button>
        </p>
      </div>
      { visible && <Modal onClose={onClose}><OrderDetails /></Modal> }
    </>   
  )
}

TotalPrice.propTypes = {
  totalPrice: PropTypes.number
}
