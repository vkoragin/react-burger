import axios, { AxiosError } from 'axios';
import { getCookie } from '../../utils';
import { profileUrl } from '../../url';
import { TProfileResponse } from './profile.types';
import { refreshToken } from './auth';
import type { AppDispatch, AppThunk } from '../store.types';

import {
  GET_USER,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
} from './actionTypes';

export const updateUser =
  (data: { email: string; name: string; password: string }) =>
  async (dispatch: AppDispatch | AppThunk) => {
    dispatch({
      type: GET_USER,
    });

    try {
      const response = await axios.patch(profileUrl, data, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: getCookie('accessToken'),
        },
      });
      dispatch({
        type: GET_USER_SUCCESS,
        user: response.data.user,
      });
      const result: TProfileResponse = response.data.user;
      return result;
    } catch (error) {
      dispatch({ type: GET_USER_FAILED });
      const err = error as AxiosError;
      if (err.response?.status === 403)
        dispatch(refreshToken(updateUser));
      return false;
    }
  };

export const getUser =
  () => async (dispatch: AppDispatch | AppThunk) => {
    dispatch({
      type: GET_USER,
    });

    try {
      const response = await axios.get(profileUrl, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: getCookie('accessToken'),
        },
      });
      dispatch({
        type: GET_USER_SUCCESS,
        user: response.data.user,
      });
      const result: TProfileResponse = response.data.user;
      return result;
    } catch (error) {
      dispatch({ type: GET_USER_FAILED });
      const err = error as AxiosError;
      if (err.response?.status === 403)
        dispatch(refreshToken(updateUser));
      return false;
    }
  };
