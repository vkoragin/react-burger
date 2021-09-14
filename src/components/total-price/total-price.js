import {useEffect, useState} from 'react'
import OrderDetails from '../order-details/order-details.js'
import Modal from '../modal/modal.js'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './total-price.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getCookie } from '../../utils'
import { getOrderNumber } from '../../services/actions/order-details.js'
import { refreshToken } from '../../services/actions/auth'

export default function TotalPrice () {
  const [visible, setVisible] = useState(false)
  const { constructor } = useSelector(store => store.ingredients)
  const [price, setPrice] = useState(0)
  const history = useHistory()
  const isAuth = getCookie('accessToken')
  const dispatch = useDispatch()

  const onClose = () => setVisible(false)

  const onOpen = () => {
    if (isAuth) {
      if (constructor.length) {
        setVisible(true)
        createOrder()
      }
    } else {
      history.replace({ pathname: '/login' })
    }    
  }

  const createOrder = () => {
    const ingredientsIds = constructor.map(ingredient => ingredient['_id'])
    dispatch(getOrderNumber(ingredientsIds))
    .catch(() => {
      dispatch(refreshToken())
      .then(() => dispatch(getOrderNumber(ingredientsIds)))   
    })
  }

  useEffect(() => {
    const totalPrice = constructor.reduce((sum, current) => current.type === 'bun' ? sum + current.price * 2 : sum + current.price, 0)
    setPrice(totalPrice)
  }, [constructor])

  return (
    <>
      <div className={ styles.totalPrice }>
        <span className='text text_type_digits-default pr-2'>{price}</span>
        <CurrencyIcon/>
        <p className='ml-10'>
          {Boolean(constructor.length) && <Button onClick={onOpen} type='primary' size='medium'>Оформить заказ</Button>}
        </p>
      </div>
      { visible && <Modal onClose={onClose}><OrderDetails/></Modal> }
    </>   
  )
}
