import {
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    CLEAR_ORDER
} from './actionTypes'
import { TOrder } from '../../types'

export type GetOrderAction = {
    type: typeof GET_ORDER 
}

export type GetOrderActionSuccess = {
    type: typeof GET_ORDER_SUCCESS
    order: TOrder
}

export type GetOrderActionFailed = {
    type: typeof GET_ORDER_FAILED
}

export type ClearOrderAction = {
    type: typeof CLEAR_ORDER
    order: null
}

export type Actions = 
    | GetOrderAction 
    | GetOrderActionSuccess
    | GetOrderActionFailed
    | ClearOrderAction

export type TGetOrderResponse = {
    name: string
    orders: TOrder[]
    success: boolean
} & Response