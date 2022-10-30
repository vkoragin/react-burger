import axios, { AxiosError } from 'axios';

import { getCookie } from '../../utils';
import { profileUrl } from '../../url';
import type { AppDispatch, AppThunk } from '../store.types';

import { refreshToken } from './auth';

import {
  GET_USER,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
} from './actionTypes';

type TUpdateUserData = {
  email: string;
  name: string;
  password: string;
};

export const updateUser =
  (userData: TUpdateUserData) =>
  async (dispatch: AppDispatch | AppThunk) => {
    dispatch({
      type: GET_USER,
    });

    try {
      const { data } = await axios.patch(profileUrl, userData, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: getCookie('accessToken'),
        },
      });
      dispatch({
        type: GET_USER_SUCCESS,
        user: data.user,
      });
      return data;
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
      const { data } = await axios.get(profileUrl, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: getCookie('accessToken'),
        },
      });
      dispatch({
        type: GET_USER_SUCCESS,
        user: data.user,
      });
      return data;
    } catch (error) {
      dispatch({ type: GET_USER_FAILED });
      const err = error as AxiosError;
      if (err.response?.status === 403)
        dispatch(refreshToken(updateUser));
      return false;
    }
  };
