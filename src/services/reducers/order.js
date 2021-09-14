import {
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    CLEAR_ORDER
} from '../actions/actionTypes'

const initialOrderState = {
  order: [],
  orderRequest: false,
  orderFailed: false
}

export const orderReducer = (state = initialOrderState, action) => {
  switch (action.type) {
    case GET_ORDER: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      }
    }
    case GET_ORDER_SUCCESS: {
      return { 
          ...state, 
          order: action.order, 
          orderRequest: false 
      }
    }
    case GET_ORDER_FAILED: {
      return { 
          ...state, 
          orderFailed: true, 
          orderRequest: false 
      }
    }
    case CLEAR_ORDER: {
      return {
        ...state,
        order: []
      }
    }
    default: {
      return state
    }
  }
}
