import styles from './order-details.module.css'
import done from '../../images/done.png'

export default function OrderDetails () {
    return (
        <div className={styles.details}>
            <p className="text text_type_digits-large mb-5">034536</p>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
            <p className="mb-15"><img src={done} alt='done'/></p>
            <p className="text text_type_main-default mb-3">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>     
    )
}
