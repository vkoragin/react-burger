import { orderReducer } from './order'
import {
    GET_ORDER,
    GET_ORDER_SUCCESS,
    CLEAR_ORDER
} from '../actions/actionTypes'

const orders = [
    {
        createdAt: "2021-09-19T13:35:57.822Z",
        ingredients: ["60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733c9", "60d3b41abdacab0026a733c7"],
        name: "Бессмертный space флюоресцентный бургер",
        number: 3559,
        owner: "612ccfca15024d001b9d1285",
        status: "done",
        updatedAt: "2021-09-19T13:35:57.954Z",
        __v: 0,
        _id: "61473cbddab0f3001bb06df8"
    }
]

const initialOrderState = {
    order: [],
    orderRequest: false,
    orderFailed: false
}

describe('check orderReducer', () => {
    it('check initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(initialOrderState)
    })

    it('check GET_ORDER', () => {
        const expected = {
            ...initialOrderState,
            orderRequest: true
        }
    
        const recived = orderReducer(initialOrderState, {
            type: GET_ORDER
        })
    
        expect(recived).toEqual(expected)
    })

    it('check GET_ORDER_SUCCESS', () => {    
        const expected = {
            ...initialOrderState,
            order: orders,
            orderRequest: false
        }
    
        const recived = orderReducer(initialOrderState, {
            type: GET_ORDER_SUCCESS,
            order: orders
        })
    
        expect(recived).toEqual(expected)
    })

    it('check CLEAR_ORDER', () => {
        const expected = {
            ...initialOrderState,
            order: []
        }
    
        const recived = orderReducer(initialOrderState, {
            type: CLEAR_ORDER
        })
    
        expect(recived).toEqual(expected)
    })
})
