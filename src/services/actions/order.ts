import axios from 'axios';
import { Dispatch } from 'react';
import { orderItemUrl } from '../../url';
import { Actions } from './order.types';
import {
  GET_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
} from './actionTypes';

const getOrder =
  (id: string) => async (dispatch: Dispatch<Actions>) => {
    dispatch({ type: GET_ORDER });

    try {
      const { data } = await axios.get(orderItemUrl + id);
      dispatch({
        type: GET_ORDER_SUCCESS,
        order: data.orders[0],
      });
      return data;
    } catch {
      dispatch({
        type: GET_ORDER_FAILED,
      });
      return false;
    }
  };

export default getOrder;
