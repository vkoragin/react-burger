import { ingredientsReducer } from './burger-ingredients';
import { TIngredient } from '../../types';
import { BurgerIngredientStore } from './burger-ingredient.types';
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  ADD_TO_CONSTRUCTOR,
  DEL_FROM_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR,
  REORDER_INGREDIENTS,
  SET_UNIQUE_KEY,
} from '../actions/actionTypes';

const ingredient: TIngredient = {
  calories: 420,
  carbohydrates: 53,
  fat: 24,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large:
    'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile:
    'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  name: 'Краторная булка N-200i',
  price: 1255,
  proteins: 80,
  type: 'bun',
  __v: 0,
  _id: '60d3b41abdacab0026a733c6',
};

const uniqueKey = 100;

const ingredients: TIngredient[] = [
  {
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large:
      'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile:
      'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    name: 'Краторная булка N-200i',
    price: 1255,
    proteins: 80,
    type: 'bun',
    __v: 0,
    _id: '60d3b41abdacab0026a733c6',
  },
];

const ingredientsWithUniqueKeys: TIngredient[] = [
  {
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large:
      'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile:
      'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    name: 'Краторная булка N-200i',
    price: 1255,
    proteins: 80,
    type: 'bun',
    __v: 0,
    _id: '60d3b41abdacab0026a733c6',
    uniqueKey,
  },
];

const initialIngredientsState: BurgerIngredientStore = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  constructor: [],
};

describe('check ingredientsReducer', () => {
  it('check GET_INGREDIENTS', () => {
    const expected = {
      ...initialIngredientsState,
      ingredientsRequest: true,
    };

    const recived = ingredientsReducer(initialIngredientsState, {
      type: GET_INGREDIENTS,
    });

    expect(recived).toEqual(expected);
  });

  it('check GET_INGREDIENTS_SUCCESS', () => {
    const expected = {
      ...initialIngredientsState,
      ingredients,
      ingredientsRequest: false,
    };

    const recived = ingredientsReducer(initialIngredientsState, {
      type: GET_INGREDIENTS_SUCCESS,
      ingredients,
    });

    expect(recived).toEqual(expected);
  });

  it('check ADD_TO_CONSTRUCTOR', () => {
    const expected = {
      ...initialIngredientsState,
      constructor: ingredients,
    };

    const recived = ingredientsReducer(initialIngredientsState, {
      type: ADD_TO_CONSTRUCTOR,
      el: ingredient,
    });

    expect(recived).toEqual(expected);
  });

  it('check SET_UNIQUE_KEY', () => {
    const init: BurgerIngredientStore = {
      ingredients: [],
      ingredientsRequest: false,
      ingredientsFailed: false,
      constructor: ingredients,
    };

    const expected = {
      ...initialIngredientsState,
      constructor: ingredientsWithUniqueKeys,
    };

    const recived = ingredientsReducer(init, {
      type: SET_UNIQUE_KEY,
    });

    expect(Boolean(recived.constructor[0].uniqueKey)).toEqual(
      Boolean(expected.constructor[0].uniqueKey),
    );
  });

  it('check REORDER_INGREDIENTS', () => {
    const expected = {
      ...initialIngredientsState,
      constructor: ingredientsWithUniqueKeys,
    };

    const recived = ingredientsReducer(initialIngredientsState, {
      type: REORDER_INGREDIENTS,
      newElements: ingredientsWithUniqueKeys,
    });

    expect(recived).toEqual(expected);
  });

  it('check DEL_FROM_CONSTRUCTOR', () => {
    const init: BurgerIngredientStore = {
      ingredients: [],
      ingredientsRequest: false,
      ingredientsFailed: false,
      constructor: ingredientsWithUniqueKeys,
    };

    const expected = {
      ...initialIngredientsState,
      constructor: ingredientsWithUniqueKeys,
    };

    const recived = ingredientsReducer(init, {
      type: DEL_FROM_CONSTRUCTOR,
      uniqueKey,
    });

    expect(recived.constructor.length).toEqual(
      expected.constructor.length - 1,
    );
  });

  it('check CLEAR_CONSTRUCTOR', () => {
    const expected = {
      ...initialIngredientsState,
      constructor: [],
    };

    const recived = ingredientsReducer(initialIngredientsState, {
      type: CLEAR_CONSTRUCTOR,
    });

    expect(recived).toEqual(expected);
  });
});
