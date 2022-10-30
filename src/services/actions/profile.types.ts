import {
  GET_USER,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
} from './actionTypes';
import { TUser } from '../../types';

export type GetUserAction = {
  type: typeof GET_USER;
};

export type GetUserActionSuccess = {
  type: typeof GET_USER_SUCCESS;
  user: TUser;
};

export type GetUserActionFailed = {
  type: typeof GET_USER_FAILED;
};

export type Actions =
  | GetUserAction
  | GetUserActionSuccess
  | GetUserActionFailed;

export type TProfileResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
} & Response;
