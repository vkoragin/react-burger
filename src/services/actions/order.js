import { orderItemUrl } from '../../url.js'
import axios from 'axios'
import {
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS
} from './actionTypes'

export function getOrder (id) {
    console.log(orderItemUrl)
    return function(dispatch) {
        dispatch({type: GET_ORDER})
        
        return axios
        .get(orderItemUrl + id)
        .then(response => {
            dispatch({
                type: GET_ORDER_SUCCESS,
                order: response.data.orders[0]
            })
        })
        .catch(error => {            
            dispatch({
                type: GET_ORDER_FAILED
            })
            throw error
        })
    }
}