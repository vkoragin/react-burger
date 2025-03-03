import axios from 'axios';

import { Dispatch } from 'react';

import { getCookie } from '../../utils';
import { forgotPasswordUrl } from '../../url';
import { LoaderAction } from './loader.types';
import { SHOW_LOADER } from './actionTypes';

export type TForgotPasswordResponse = {
  success: boolean;
  message: string;
} & Response;

export const resetPassword = (email: string) => async (dispatch: Dispatch<LoaderAction>) => {
  dispatch({
    type: SHOW_LOADER,
    loader: true,
  });

  try {
    const { data } = await axios.post(
      forgotPasswordUrl,
      { email },
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: getCookie('accessToken'),
        },
      },
    );
    localStorage.setItem('resetPassword', 'true');
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
