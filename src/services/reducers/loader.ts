import { LoaderAction } from '../actions/loader.types'
import { LoaderStore } from './loader.types'
import {
    SHOW_LOADER
} from '../actions/actionTypes'

const initialState: LoaderStore = {
  loader: false
}

export const loaderReducer = (state = initialState, action: LoaderAction) => {
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