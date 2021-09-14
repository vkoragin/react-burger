import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { order } from '../../types.js'
import styles from './feed-item.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { formatDate } from '../../utils'
import { useLocation, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export function FeedItem(props) {
    const {order, showStatus} = props
    const { ingredients } = useSelector(store => store.ingredients)
    const [orderIngredients, setOurderIngredients] = useState([])
    const [images, setImages] = useState([])
    const [count, setCount] = useState(0)
    const [price, setPrice] = useState(0)
    const showCount = 5
    const location = useLocation()
    const orderId = order.number

    useEffect(() => {
        if (ingredients.length) {
            let totalPrice = 0
            let targetIngredients = []
            order.ingredients.forEach(ingredient => {
                let targetIngredient = ingredients.filter(item => item['_id'] === ingredient)[0]
                targetIngredients.push(targetIngredient)
                totalPrice += targetIngredient.price
            })
            setPrice(totalPrice)
            setOurderIngredients(targetIngredients)        
        }        
    }, [ingredients, order.ingredients])

    useEffect(() => {
        let bun = 0
        let targetImages = []
        orderIngredients.forEach(ingredient => {
            if (ingredient.type === 'bun' && !bun) {
                bun = 1
                targetImages.push(ingredient['image_mobile'])
            } 
            if (ingredient.type !== 'bun') {
                targetImages.push(ingredient['image_mobile']) 
            }
        })  
        setImages(targetImages)
        setCount(targetImages.length)
    }, [orderIngredients])

    const getStatus = status => {
        if (status === 'done') return 'Выполнен'
        if (status === 'created') return 'Создан'
        if (status === 'pending') return 'Готовится'
        return false
    }

    const getStatusColor = status => status === 'done' ? '#00CCCC' : '#FFFFFF'

    return (
        <Link
            key={orderId}
            to={{        
                pathname: `${location.pathname}/${orderId}`,
                state: { background: location },
            }}
            className={styles.link}
        >
            <section className={styles.order}>
                <header className={styles.header}>
                    <p className="text text_type_digits-default">{'#' + order.number}</p>
                    <p className="text text_type_main-default text_color_inactive">{formatDate(order.createdAt)}</p>
                </header>
                <p className={styles.name + ' text text_type_main-medium pb-6 pt-6'}>
                    {order.name}<br/>
                    {showStatus && <span className="text text_type_main-default" style={{color: getStatusColor(order.status)}}>{getStatus(order.status)}</span>}
                </p>
                <footer className={styles.footer}>
                    <div className={styles.images}>
                        {
                            images.map((image, i) => {
                                let left = -i * 15
                                if (i <= showCount - 1)
                                    return  <div key={i} className={styles.imageWrapper} style={{left: left, zIndex: 100 - i}}>
                                                <img className={styles.image} src={image} alt="" />
                                            </div>
                                if (i === showCount)
                                    return  <div key={i} className={styles.imageWrapper} style={{left: left, zIndex: 100 - i}}>
                                                <p className={styles.count + ' text text_type_digits-default'}>{'+' + (count - showCount + 1)}</p>
                                                <img className={styles.image} style={{opacity: 0.5}} src={image} alt="" />
                                            </div>
                                return false
                            })
                        }
                    </div>
                    <div className={styles.coast}>
                        <span className='text text_type_digits-default pr-2'>{price}</span>
                        <CurrencyIcon style={{verticalAlign: 'bottom'}}/>
                    </div>
                </footer>
            </section>
        </Link>        
    )
}

FeedItem.propTypes = {
    order: order.isRequired,
    showStatus: PropTypes.bool
}