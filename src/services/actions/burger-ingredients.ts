import { Dispatch } from 'react';

import { getIngredientsUrl } from '../../url';
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  SHOW_LOADER,
  ACTIVE_TAB,
} from './actionTypes';
import { Actions, TIngredientsResponse } from './burgrer-ingredients.types';

export const getIngredients = () => (dispatch: Dispatch<Actions>) => {
  dispatch({ type: GET_INGREDIENTS });
  dispatch({ type: SHOW_LOADER, loader: true });

  fetch(getIngredientsUrl)
    .then<TIngredientsResponse>((res: Response) => {
      if (res.ok) return res.json();
      return Promise.reject(res.status);
    })
    .then((ingredients) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: ingredients.data,
      });
    })
    .catch(() => {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
      });
    })
    .finally(() =>
      dispatch({
        type: SHOW_LOADER,
        loader: false,
      }),
    );
};

export const setActiveTab = (activeTab: string) => {
  return {
    type: ACTIVE_TAB,
    activeTab,
  };
};
