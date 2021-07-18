import React from 'react'
import PropTypes from 'prop-types'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './total-price.module.css'

export default class TotalPrice extends React.Component {
  render() {
    return (
      <div className={ styles.totalPrice }>
        <span className='text text_type_digits-medium pr-2'>{this.props.price}</span>
        <CurrencyIcon/>
        <p className='ml-10'><Button type='primary' size='medium'>Оформить заказ</Button></p>
      </div>
    )
  }
}

TotalPrice.propTypes = {
  totalPrice: PropTypes.number.isRequired
}
