import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FeedItem } from '../components/feed-item/feed-item'
import styles from './feed.module.css'
import { feedsUrl } from '../url'

export function FeedPage() {
    const dispatch = useDispatch()
    const { messages } = useSelector(store => store.messages)
    const [orders, setOrders] = useState([])
    const [createdNumbers, setCreatedNumbers] = useState([])
    const [doneNumbers, setDoneNumbers] = useState([])
    const [total, setTotal] = useState(0)
    const [totalToday, setTotalToday] = useState(0)

    useEffect(() => {
        dispatch({type: 'WS_CONNECTION_START', payload: feedsUrl})
        return () => dispatch({type: 'WS_CONNECTION_CLOSED'})
    }, [dispatch])

    useEffect(() => {
        if (messages[0]?.orders) {
            setOrders(messages[0].orders)
            setTotal(messages[0].total)
            setTotalToday(messages[0].totalToday)
        }
    }, [messages])

    useEffect(() => {
        if (orders.length) {
            const created = orders.filter(item => item.status === 'created')
            const done = orders.filter(item => item.status === 'done')
            setCreatedNumbers(splitArray(created, 10))
            setDoneNumbers(splitArray(done, 10))
        }
    }, [orders])

    const splitArray = (arr, size) => arr.reduce((p,c) => {
        if (p[p.length-1].length === size) p.push([])        
        p[p.length-1].push(c)
        return p
    }, [[]])

    return (
        <div>
            <header className={ styles.header }>
                <h1 className='text text_type_main-large pt-8 pb-6'>Лента заказов</h1>
            </header>
            <section className={ styles.content }>
                <div className={ styles.feed }>
                    { Boolean(orders.length) && orders.map(item => <FeedItem key={item['_id']} order={item} showStatus={false} />) }
                </div>
                
                <div className={ styles.feedInfo }>
                    <div className={ styles.statusesWrapper }>
                        <section className={ styles.statuses }>
                            <header className="text text_type_main-medium pb-6">Готовы:</header>
                            <div className={ styles.statusesColumns }>
                                {
                                    doneNumbers.length && doneNumbers[0].length
                                    ? doneNumbers.map((doneNumbersColumn, i) => 
                                        <div key={i} className={ styles.statusesColumn }>
                                            { doneNumbersColumn.map(item => <span key={item.number} className={ styles.done + ' text text_type_digits-default' }>{item.number}</span>) }
                                        </div>)
                                    : <p className="text text_type_main-medium text_color_inactive">нет</p>
                                }
                            </div>
                        </section>
                        <section>
                            <header className="text text_type_main-medium pb-6">В работе:</header>
                            <div className={ styles.statusesColumns }>
                                {
                                    createdNumbers.length && createdNumbers[0].length
                                    ? createdNumbers.map((createdNumbersColumn, i) => 
                                        <div key={i} className={ styles.statusesColumn }>
                                            { createdNumbersColumn.map(item => <span key={item.number} className="text text_type_digits-default">{item.number}</span>) }
                                        </div>)
                                    : <p className="text text_type_main-medium text_color_inactive">нет</p>
                                }
                            </div>
                        </section>
                    </div>
                    <div>
                        <p className="text text_type_main-medium mt-10">Выполнено за все время:</p>
                        <p className="text text_type_digits-large">{total}</p>

                        <p className="text text_type_main-medium mt-10">Выполнено за сегодня:</p>
                        <p className="text text_type_digits-large">{totalToday}</p>
                    </div>                    
                </div>
            </section>
        </div>
    )
}