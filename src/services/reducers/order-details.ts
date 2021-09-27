import { OrderNumberStore } from './order-details.type'
import { Actions } from '../actions/order-details.type'
import {
    GET_ODDER_NUMBER,
    GET_ODDER_NUMBER_FAILED,
    GET_ODDER_NUMBER_SUCCESS
} from '../actions/actionTypes'

const initialState: OrderNumberStore = {
    number: '',
    numberRequest: false,
    numberFailed: false
}

export const orderNumberReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
      case GET_ODDER_NUMBER: {
        return {
          ...state,
          numberRequest: true,
          numberFailed: false,
        }
      }
      case GET_ODDER_NUMBER_SUCCESS: {
        return { 
            ...state, 
            number: action.number, 
            numberRequest: false 
        }
      }
      case GET_ODDER_NUMBER_FAILED: {
        return { 
            ...state, 
            numberFailed: true, 
            numberRequest: false 
        }
      }
      default: {
        return state
      }
    }
  }