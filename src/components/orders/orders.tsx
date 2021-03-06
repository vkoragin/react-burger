import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FeedItem } from '../feed-item/feed-item'
import { feedsUserUrl } from '../../url'
import styles from './orders.module.css'
import { getCookie } from '../../utils'
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/actions/wsActionTypes'
import type { ReduxStore } from '../../services/store.types'
import type { TOrder } from '../../types'

export function Orders() {
    const dispatch = useDispatch()
    const { messages } = useSelector((store: ReduxStore) => store.messages)
    const [orders, setOrders] = useState<TOrder[]>([])
    let accessToken = getCookie('accessToken'), token = ''
    if (accessToken) token = accessToken.split(' ')[1]
        
    useEffect(() => {
        dispatch({type: WS_CONNECTION_START, payload: feedsUserUrl + token})
        return () => {
            dispatch({type: WS_CONNECTION_CLOSED})
        }
    }, [dispatch, token])

    useEffect(() => {
        if (messages[0]?.orders) {
            setOrders(messages[0].orders)
        }
    }, [messages])

    return (
        <div className={ styles.userFeed }>
            { 
                Boolean(orders.length)
                ? orders.map(item => item?.ingredients?.length ? <FeedItem key={item['_id']} order={item} showStatus={true}/> : false)
                : <p className="text text_type_main-default text_color_inactive pt-4">У Вас еще не было заказов</p>
            }
        </div>     
    )
}