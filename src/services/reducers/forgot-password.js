import {
    FORGOT_PASSWORD_SUCCESS
  } from '../actions/actionTypes'
  
  const initialState = {
    forgotPasswordSuccess: false
  }
  
  export const forgotPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
      case FORGOT_PASSWORD_SUCCESS: {
        return { 
            ...state,
            forgotPasswordSuccess: true
        }
      }
      default: {
        return state
      }
    }
  }