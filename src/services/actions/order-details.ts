import axios, { AxiosError } from 'axios';
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

const getOrderNumber =
  (ingredientsIds: string[]) =>
  async (dispatch: AppDispatch | AppThunk) => {
    dispatch({
      type: GET_ODDER_NUMBER,
    });

    try {
      const response = await axios.post(
        getOrderNumberUrl,
        { ingredients: ingredientsIds },
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: getCookie('accessToken'),
          },
        },
      );
      dispatch({
        type: GET_ODDER_NUMBER_SUCCESS,
        number: response.data.order.number,
      });
      dispatch({
        type: CLEAR_CONSTRUCTOR,
      });
      const result: TGetOrderNumberResponse = response.data;
      return result;
    } catch (error) {
      dispatch({ type: GET_ODDER_NUMBER_FAILED });
      const err = error as AxiosError;
      if (err.response?.status === 403)
        dispatch(refreshToken(getOrderNumber));
      return false;
    }
  };

export default getOrderNumber;