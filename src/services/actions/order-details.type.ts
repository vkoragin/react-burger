import {
  GET_ODDER_NUMBER,
  GET_ODDER_NUMBER_FAILED,
  GET_ODDER_NUMBER_SUCCESS,
} from './actionTypes';
import { TOrder } from '../../types';

export type GetOrderNumberAction = {
  type: typeof GET_ODDER_NUMBER;
};

export type GetOrderNumberActionSuccess = {
  type: typeof GET_ODDER_NUMBER_SUCCESS;
  number: number;
};

export type GetOrderNumberActionFailed = {
  type: typeof GET_ODDER_NUMBER_FAILED;
};

export type Actions =
  | GetOrderNumberAction
  | GetOrderNumberActionSuccess
  | GetOrderNumberActionFailed;

export type TGetOrderNumberResponse = {
  name: string;
  order: TOrder;
  success: boolean;
} & Response;
