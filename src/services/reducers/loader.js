import {
    SHOW_LOADER
} from '../actions/actionTypes'

const initialState = {
    loader: false
}

export const loaderReducer = (state = initialState, action) => {
    switch (action.type) {
      case SHOW_LOADER: {
        return {
            loader: action.loader
        }
      }
      default: {
        return state
      }
    }
  }