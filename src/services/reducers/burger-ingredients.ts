import { Actions, ActiveTabAction } from '../actions/burgrer-ingredients.types';
import { ActiveTabStore, BurgerIngredientStore } from './burger-ingredient.types';
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  ACTIVE_TAB,
  ADD_TO_CONSTRUCTOR,
  DEL_FROM_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR,
  REORDER_INGREDIENTS,
  SET_UNIQUE_KEY,
} from '../actions/actionTypes';

const initialTabState: ActiveTabStore = {
  activeTab: 'Булки',
};

export const activeTabReducer = (state = initialTabState, action: ActiveTabAction) => {
  if (action.type === ACTIVE_TAB) return { activeTab: action.activeTab };
  return state;
};

const initialIngredientsState: BurgerIngredientStore = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  constructor: [],
};

export const ingredientsReducer = (state = initialIngredientsState, action: Actions) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
      };
    }
    case REORDER_INGREDIENTS:
      return {
        ...state,
        constructor: action.newElements,
      };
    case ADD_TO_CONSTRUCTOR: {
      return {
        ...state,
        constructor:
          action.el.type === 'bun'
            ? [...state.constructor.filter((item) => item.type !== 'bun'), action.el]
            : [...state.constructor, action.el],
      };
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        constructor: [],
      };
    }
    case DEL_FROM_CONSTRUCTOR: {
      return {
        ...state,
        constructor: [...state.constructor].filter(
          (ingredient) => ingredient.uniqueKey !== action.uniqueKey,
        ),
      };
    }
    case SET_UNIQUE_KEY:
      return {
        ...state,
        constructor: [
          ...state.constructor.map((item) => {
            return {
              ...item,
              uniqueKey: Number((Math.random() * 10000).toFixed(0)),
            };
          }),
        ],
      };
    default: {
      return state;
    }
  }
};
