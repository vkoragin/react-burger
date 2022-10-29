import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import { setCookie, deleteCookie } from '../../utils';
import {
  loginUrl,
  registrUrl,
  logoutUrl,
  refrechTokenUrl,
} from '../../url';
import { LoaderAction } from './loader.types';
import {
  TLoginUserResponse,
  TRegisterUserResponse,
  TLogoutUserResponse,
  TRefreshTokenResponse,
} from './auth.types';

import { SHOW_LOADER } from './actionTypes';

export function loginUser(data: { email: string; password: string }) {
  return function (dispatch: Dispatch<LoaderAction>) {
    dispatch({
      type: SHOW_LOADER,
      loader: true,
    });

    return axios
      .post(loginUrl, data, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
      })
      .then<TLoginUserResponse>((response: AxiosResponse) => {
        setCookie('accessToken', response.data.accessToken);
        localStorage.setItem(
          'refreshToken',
          response.data.refreshToken,
        );
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() =>
        dispatch({
          type: SHOW_LOADER,
          loader: false,
        }),
      );
  };
}

export function registerUser(data: {
  email: string;
  password: string;
  name: string;
}) {
  return function (dispatch: Dispatch<LoaderAction>) {
    dispatch({
      type: SHOW_LOADER,
      loader: true,
    });

    return axios
      .post(registrUrl, data, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
      })
      .then<TRegisterUserResponse>((response: AxiosResponse) => {
        setCookie('accessToken', response.data.accessToken);
        localStorage.setItem(
          'refreshToken',
          response.data.refreshToken,
        );
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() =>
        dispatch({
          type: SHOW_LOADER,
          loader: false,
        }),
      );
  };
}

export function logoutUser() {
  return function (dispatch: Dispatch<LoaderAction>) {
    dispatch({
      type: SHOW_LOADER,
      loader: true,
    });

    return axios
      .post(
        logoutUrl,
        { token: localStorage.refreshToken },
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        },
      )
      .then<TLogoutUserResponse>((response: AxiosResponse) => {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('resetPassword');
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() =>
        dispatch({
          type: SHOW_LOADER,
          loader: false,
        }),
      );
  };
}

export function refreshToken(callback: Function) {
  return function (dispatch: Dispatch<LoaderAction>) {
    dispatch({
      type: SHOW_LOADER,
      loader: true,
    });

    return axios
      .post(
        refrechTokenUrl,
        { token: localStorage.refreshToken },
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        },
      )
      .then<TRefreshTokenResponse>((response: AxiosResponse) => {
        setCookie('accessToken', response.data.accessToken);
        localStorage.setItem(
          'refreshToken',
          response.data.refreshToken,
        );
        dispatch(callback());
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() =>
        dispatch({
          type: SHOW_LOADER,
          loader: false,
        }),
      );
  };
}
