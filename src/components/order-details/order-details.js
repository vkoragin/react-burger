import React, { useContext } from 'react'
import { IngredientsContext } from '../../context/ingredientsContext.js'
import styles from './order-details.module.css'
import done from '../../images/done.png'

export default function OrderDetails () {
    const ingredients = useContext(IngredientsContext)
    const [number, srtNumber] = React.useState('')
    const [error, setError] = React.useState(false)
    const [load, setLoad] = React.useState(true)
    const url = 'https://norma.nomoreparties.space/api/orders'

    React.useEffect(() => {
        const ingredientsIds = ingredients.map(ingredient => ingredient['_id'])
        fetch(url, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json;charset=utf-8'}, 
            body: JSON.stringify({ingredients: ingredientsIds})
        })
        .then(res => {
          if (res.ok) return res.json()
          return Promise.reject(res.status)
        })
        .then(orderData => srtNumber(orderData.order.number))
        .catch(() => setError(true))
        .finally(() => setLoad(false))
      }, [ingredients])

    return (
        <div className={styles.details}>
            {load 
              ? <p className="text text_type_main-medium mb-15">Создание заказа...</p>
              : error 
                ? <p className="text text_type_main-medium mb-15">что-то пошло не так</p>
                : 
                <>
                    <p className="text text_type_digits-large mb-5">{number}</p>
                    <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
                    <p className="mb-15"><img src={done} alt='done'/></p>
                    <p className="text text_type_main-default mb-3">Ваш заказ начали готовить</p>
                    <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
                </>}
        </div>     
    )
}
