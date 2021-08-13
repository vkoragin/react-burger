import {useEffect, useState} from 'react'
import OrderDetails from '../order-details/order-details.js'
import Modal from '../modal/modal.js'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './total-price.module.css'
import { useSelector } from 'react-redux'

export default function TotalPrice () {
  const [visible, setVisible] = useState(false)
  const { constructor } = useSelector(store => store.ingredients)
  const [price, setPrice] = useState(0)

  const onClose = () => setVisible(false)
  const onOpen = () => setVisible(true)

  useEffect(() => {
    const totalPrice = constructor.reduce((sum, current) => current.type === 'bun' ? sum + current.price * 2 : sum + current.price, 0)
    setPrice(totalPrice)
  }, [constructor])

  return (
    <>
      <div className={ styles.totalPrice }>
        <span className='text text_type_digits-medium pr-2'>{price}</span>
        <CurrencyIcon/>
        <p className='ml-10'>
          <Button onClick={onOpen} type='primary' size='medium'>Оформить заказ</Button>
        </p>
      </div>
      { visible && <Modal onClose={onClose}><OrderDetails /></Modal> }
    </>   
  )
}
