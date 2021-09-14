import styles from './order.module.css'
import { useState, useEffect }  from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getOrder } from '../../services/actions/order'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { formatDate } from '../../utils'

export default function Order() {
    const { order, orderRequest, orderFailed } = useSelector(store => store.order)
    const { ingredients } = useSelector(store => store.ingredients)
    const dispatch = useDispatch()
    const { id } = useParams()
    const [orderIngredients, setOurderIngredients] = useState(null)
    const [price, setPrice] = useState(0)

    useEffect(() => {      
        dispatch(getOrder(id))    
    }, [dispatch, id])

    useEffect(() => {
        if (ingredients.length) {
            let totalPrice = 0
            order?.ingredients?.forEach(ingredient => {
                let targetIngredient = ingredients.filter(item => item['_id'] === ingredient)[0]
                totalPrice += targetIngredient.price
            })
            setPrice(totalPrice)
    
            let orderIngredientsSet = new Set()
            let turgetOrderIngredients = []
            order?.ingredients?.forEach(item => orderIngredientsSet.add(item))
            orderIngredientsSet.forEach(value => turgetOrderIngredients.push(ingredients.filter(ingredient => ingredient['_id'] === value)[0]))
            turgetOrderIngredients.forEach(item => item.count = order.ingredients.filter(ingredient => ingredient === item['_id']).length)
            setOurderIngredients(turgetOrderIngredients)
        }       
    }, [ingredients, order])

    const getStatus = status => {
        if (status === 'done') return 'Выполнен'
        if (status === 'created') return 'Создан'
        if (status === 'pending') return 'Готовится'
        return false
    }

    const getStatusColor = status => status === 'done' ? '#00CCCC' : '#FFFFFF'

    if (orderFailed) return <p className="text text_type_main-default text_color_inactive">Произошла ошибка при получении данных о заказк</p>
    else if (orderRequest) return <p className="text text_type_main-default text_color_inactive">Загрузка заказа...</p>
    else {
        return (
            <section className={styles.orderInfo}>
                <header className="text text_type_digits-default pt-4">{'#' + order.number}</header>
                <p className="text text_type_main-medium pt-10">{order.name}</p>
                <p className="text text_type_main-default pt-2">
                    <span style={{color: getStatusColor(order.status)}}>{getStatus(order.status)}</span>
                </p>
                <p className="text text_type_main-medium pt-15 pb-4">Состав:</p>
                <div className={styles.orderWrapper + ' pr-2'}>
                    {
                        Boolean(orderIngredients) && 
                            orderIngredients.map((ingredient, i) => {                            
                                return  <div key={i} className={styles.order + ' mt-4 pb-2'}>
                                            <div className={styles.info}>
                                                <div className={styles.imageWrapper + ' mr-4'}>
                                                    <img className={styles.image} src={ingredient.image_mobile} alt="" />
                                                </div>
                                                <div className={styles.name + ' text text_type_main-default'}>
                                                    {ingredient.name}
                                                </div>
                                            </div>
                                        
                                            <div className={styles.price + ' text text_type_digits-default'}>
                                                <span className="pr-2">
                                                    {ingredient.count > 1 && ingredient.count + ' x '}
                                                    {ingredient.price}
                                                </span>                                            
                                                <CurrencyIcon />
                                            </div>
                                        </div>
                            })
                    }
                </div>
                <footer className={styles.footer + ' mt-10 pr-2'}>
                    <p className="text text_type_main-default text_color_inactive">{formatDate(order.createdAt)}</p>
                    <div className={styles.price + ' text text_type_digits-default'}>
                        <span className="pr-2">
                            {price}
                        </span>                                            
                        <CurrencyIcon />
                    </div>
                </footer>
            </section>
        )
    }    
}