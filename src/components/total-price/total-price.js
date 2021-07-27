import React from 'react'
import OrderDetails from '../order-details/order-details.js'
import Modal from '../modal/modal.js'
import PropTypes from 'prop-types'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './total-price.module.css'

export default function TotalPrice (props) {
  const [visible, setVisible] = React.useState(false)

  const onClose = () => setVisible(false)
  const onOpen = () => setVisible(true)

  return (
    <>
      <div className={ styles.totalPrice }>
        <span className='text text_type_digits-medium pr-2'>{props.price}</span>
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
