import { getOrderNumberUrl } from '../../url.js'
import { getCookie } from '../../utils'
import {
    GET_ODDER_NUMBER,
    GET_ODDER_NUMBER_FAILED,
    GET_ODDER_NUMBER_SUCCESS,
    CLEAR_CONSTRUCTOR
} from './actionTypes'

export function getOrderNumber (ingredientsIds) {
    return function(dispatch) {
        dispatch({
            type: GET_ODDER_NUMBER
        })

        return fetch(getOrderNumberUrl, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': getCookie('accessToken')
            }, 
            body: JSON.stringify({ingredients: ingredientsIds})
        })
        .then( res  => {
            if (res.ok) return res.json()
            return Promise.reject(res.status)
        })
        .then(orderData => {
            dispatch({
                type: GET_ODDER_NUMBER_SUCCESS,
                number: orderData.order.number
            })
            dispatch({
                type: CLEAR_CONSTRUCTOR
            })
        })
        .catch(() => {            
            dispatch({
                type: GET_ODDER_NUMBER_FAILED
            })
        })
    }
}