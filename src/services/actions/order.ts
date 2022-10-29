import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import { orderItemUrl } from '../../url';
import { Actions, TGetOrderResponse } from './order.types';
import {
  GET_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
} from './actionTypes';

export function getOrder(id: string) {
  return function (dispatch: Dispatch<Actions>) {
    dispatch({ type: GET_ORDER });

    return axios
      .get(orderItemUrl + id)
      .then<TGetOrderResponse>((response: AxiosResponse) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: response.data.orders[0],
        });
        return response.data;
      })
      .catch(() => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
}
