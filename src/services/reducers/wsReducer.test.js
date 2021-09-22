import { wsReducer } from './wsReducer'
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from '../actions/wsActionTypes'

const messages = [
    {
        orders: [
            {
                createdAt: "2021-09-19T13:51:33.650Z",
                ingredients: ["60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733c7"],
                name: "Space флюоресцентный бургер",
                number: 3562,
                status: "done",
                updatedAt: "2021-09-19T13:51:33.753Z",
                _id: "61474065dab0f3001bb06e03"
            }
        ],
        success: true,
        total: 3475,
        totalToday: 69,
    }
]

const initialState = {
    wsConnected: false,
    messages: [],
    error: ''
}

describe('check wsReducer', () => {
    it('check initial state', () => {
        expect(wsReducer(undefined, {})).toEqual(initialState)
    })

    it('check WS_CONNECTION_SUCCESS', () => {
        const expected = {
            ...initialState,
            error: null,
            wsConnected: true
        }
    
        const recived = wsReducer(initialState, {
            type: WS_CONNECTION_SUCCESS
        })
    
        expect(recived).toEqual(expected)
    })

    it('check WS_CONNECTION_CLOSED', () => {
        const expected = {
            ...initialState,
            error: null,
            wsConnected: false
         }
    
        const recived = wsReducer(initialState, {
            type: WS_CONNECTION_CLOSED
        })
    
        expect(recived).toEqual(expected)
    })

    it('check WS_GET_MESSAGE', () => {
        const expected = {
          ...initialState,
          error: null,
          messages: [messages]
         }
    
        const recived = wsReducer(initialState, {
            type: WS_GET_MESSAGE,
            payload: messages
        })
    
        expect(recived).toEqual(expected)
    })
})
