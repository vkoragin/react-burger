import axios from 'axios';
import { Dispatch } from 'react';
import { getCookie } from '../../utils';
import { resetPasswordUrl } from '../../url';
import { LoaderAction } from './loader.types';

import { SHOW_LOADER } from './actionTypes';

export type TResetPasswordResponse = {
  success: boolean;
  message: string;
} & Response;

export function resetPassword(authData: {
  password: string;
  token: string;
}) {
  return async function (dispatch: Dispatch<LoaderAction>) {
    dispatch({
      type: SHOW_LOADER,
      loader: true,
    });

    try {
      const { data } = await axios.post(resetPasswordUrl, authData, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: getCookie('accessToken'),
        },
      });
      return data;
    } catch (error) {
      return false;
    } finally {
      return dispatch({
        type: SHOW_LOADER,
        loader: false,
      });
    }
  };
}
