import axios, { AxiosResponse } from 'axios';
import { getOrderNumberUrl } from '../../url';
import { getCookie } from '../../utils';
import type { AppDispatch, AppThunk } from '../store.types';
import { refreshToken } from './auth';
import {
  GET_ODDER_NUMBER,
  GET_ODDER_NUMBER_FAILED,
  GET_ODDER_NUMBER_SUCCESS,
  CLEAR_CONSTRUCTOR,
} from './actionTypes';
import { TGetOrderNumberResponse } from './order-details.type';

export function getOrderNumber(ingredientsIds: string[]) {
  return function (dispatch: AppDispatch | AppThunk) {
    dispatch({
      type: GET_ODDER_NUMBER,
    });

    return axios
      .post(
        getOrderNumberUrl,
        { ingredients: ingredientsIds },
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: getCookie('accessToken'),
          },
        },
      )
      .then<TGetOrderNumberResponse>((response: AxiosResponse) => {
        dispatch({
          type: GET_ODDER_NUMBER_SUCCESS,
          number: response.data.order.number,
        });
        dispatch({
          type: CLEAR_CONSTRUCTOR,
        });
        return response.data;
      })
      .catch((error) => {
        dispatch({ type: GET_ODDER_NUMBER_FAILED });
        if (error.response.status === 403)
          dispatch(refreshToken(getOrderNumber));
      });
  };
}
