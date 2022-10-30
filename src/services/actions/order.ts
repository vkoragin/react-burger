import axios from 'axios';
import { Dispatch } from 'react';
import { orderItemUrl } from '../../url';
import { Actions, TGetOrderResponse } from './order.types';
import {
  GET_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
} from './actionTypes';

const getOrder =
  (id: string) => async (dispatch: Dispatch<Actions>) => {
    dispatch({ type: GET_ORDER });

    try {
      const response = await axios.get(orderItemUrl + id);
      dispatch({
        type: GET_ORDER_SUCCESS,
        order: response.data.orders[0],
      });
      const result: TGetOrderResponse = response.data;
      return result;
    } catch {
      dispatch({
        type: GET_ORDER_FAILED,
      });
      return false;
    }
  };

export default getOrder;
