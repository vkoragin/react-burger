import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    ACTIVE_TAB,
    ADD_TO_CONSTRUCTOR,
    DEL_FROM_CONSTRUCTOR,
    REORDER_INGREDIENTS
} from '../../constants'

const initialTabState = {
  activeTab: 'Булки'
}

export const activeTabReducer = (state = initialTabState, action) => {
  if (action.type === ACTIVE_TAB) return { activeTab: action.activeTab }
  return state
}

const initialIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  constructor: []
}

export const ingredientsReducer = (state = initialIngredientsState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { 
          ...state, 
          ingredients: action.ingredients, 
          ingredientsRequest: false 
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return { 
          ...state, 
          ingredientsFailed: true, 
          ingredientsRequest: false 
      }
    }
    case REORDER_INGREDIENTS:
      return {
        ...state,
        constructor: action.newElements
      }
    case ADD_TO_CONSTRUCTOR: {
      return {
        ...state,
        constructor: action.el.type === 'bun'
          ? [...state.constructor.filter(item => item.type !== 'bun'), action.el]
          : [...state.constructor, action.el]
       
      }
    }
    case DEL_FROM_CONSTRUCTOR: {
      return { ...state, constructor: [...state.constructor].filter(ingredient => ingredient['_id'] !== action.id) }
    }
    default: {
      return state
    }
  }
}
