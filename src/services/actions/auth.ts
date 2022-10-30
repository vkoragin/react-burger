import axios from 'axios';
import { Dispatch } from 'react';
import { setCookie, deleteCookie } from '../../utils';
import {
  loginUrl,
  registrUrl,
  logoutUrl,
  refrechTokenUrl,
} from '../../url';
import { LoaderAction } from './loader.types';

import { SHOW_LOADER } from './actionTypes';

export const loginUser =
  (userData: { email: string; password: string }) =>
  async (dispatch: Dispatch<LoaderAction>) => {
    dispatch({
      type: SHOW_LOADER,
      loader: true,
    });

    try {
      const { data } = await axios.post(loginUrl, userData, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    } catch (error) {
      return false;
    } finally {
      dispatch({
        type: SHOW_LOADER,
        loader: false,
      });
    }
  };

export const registerUser =
  (userData: { email: string; password: string; name: string }) =>
  async (dispatch: Dispatch<LoaderAction>) => {
    dispatch({
      type: SHOW_LOADER,
      loader: true,
    });

    try {
      const { data } = await axios.post(registrUrl, userData, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    } catch (error) {
      return false;
    } finally {
      dispatch({
        type: SHOW_LOADER,
        loader: false,
      });
    }
  };

export const logoutUser =
  () => async (dispatch: Dispatch<LoaderAction>) => {
    dispatch({
      type: SHOW_LOADER,
      loader: true,
    });

    try {
      const { data } = await axios.post(
        logoutUrl,
        { token: localStorage.refreshToken },
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        },
      );
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('resetPassword');
      return data;
    } catch (error) {
      return false;
    } finally {
      dispatch({
        type: SHOW_LOADER,
        loader: false,
      });
    }
  };

export const refreshToken =
  (callback: any) => async (dispatch: Dispatch<LoaderAction>) => {
    dispatch({
      type: SHOW_LOADER,
      loader: true,
    });

    try {
      const { data } = await axios.post(
        refrechTokenUrl,
        { token: localStorage.refreshToken },
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        },
      );
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      dispatch(callback());
      return data;
    } catch (error) {
      return false;
    } finally {
      dispatch({
        type: SHOW_LOADER,
        loader: false,
      });
    }
  };
