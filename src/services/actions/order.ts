import { orderItemUrl } from '../../url'
import axios, { AxiosResponse } from 'axios'
import { Actions, TGetOrderResponse } from '../actions/order.types'
import { Dispatch } from 'react'
import {
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS
} from './actionTypes'

export function getOrder (id: string) {
    return function(dispatch: Dispatch<Actions>) {
        dispatch({type: GET_ORDER})
        
        return axios
        .get(orderItemUrl + id)
        .then<TGetOrderResponse>((response: AxiosResponse) => {
            dispatch({
                type: GET_ORDER_SUCCESS,
                order: response.data.orders[0]
            })
            return response.data
        })
        .catch(() => {            
            dispatch({
                type: GET_ORDER_FAILED
            })
        })
    }
}