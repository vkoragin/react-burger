import { TIngredient } from '../../types';
import { LoaderAction } from './loader.types';
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
} from './actionTypes';

export type ActiveTabAction = {
  type: typeof ACTIVE_TAB;
  activeTab: string;
};

export type GetIngredientsAction = {
  type: typeof GET_INGREDIENTS;
};

export type GetIngredientsSuccessAction = {
  type: typeof GET_INGREDIENTS_SUCCESS;
  ingredients: TIngredient[];
};

export type GetIngredientsFailedAction = {
  type: typeof GET_INGREDIENTS_FAILED;
};

export type ReorderIngredientsAction = {
  type: typeof REORDER_INGREDIENTS;
  newElements: TIngredient[];
};

export type AddToConstructorAction = {
  type: typeof ADD_TO_CONSTRUCTOR;
  el: TIngredient;
};

export type ClearConstructorAction = {
  type: typeof CLEAR_CONSTRUCTOR;
};

export type DelFromConstructorAction = {
  type: typeof DEL_FROM_CONSTRUCTOR;
  uniqueKey: number;
};

export type SetUniqueKeyAction = {
  type: typeof SET_UNIQUE_KEY;
};

export type BurgerIngredientStore = {
  ingredients: TIngredient[];
  ingredientsRequest: false;
  ingredientsFailed: false;
  constructor: TIngredient[];
};

export const initialIngredientsState: BurgerIngredientStore = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  constructor: [],
};

export type Actions =
  | GetIngredientsAction
  | GetIngredientsSuccessAction
  | GetIngredientsFailedAction
  | LoaderAction
  | ReorderIngredientsAction
  | AddToConstructorAction
  | ClearConstructorAction
  | DelFromConstructorAction
  | SetUniqueKeyAction;

export type TIngredientsResponse = {
  success?: string;
  data: TIngredient[];
} & Response;
