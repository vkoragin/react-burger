import {
    ADD_INGREDIENT,
    DEL_INGREDIENT
} from '../actions/actionTypes'

const initialState = {
    ingredient: null
}

export const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_INGREDIENT: {
        return {
          ingredient: action.ingredient
        }
      }
      case DEL_INGREDIENT: {
        return {
          ingredient: null
        }
      }
      default: {
        return state
      }
    }
  }