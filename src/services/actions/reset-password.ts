import { getCookie } from '../../utils'
import { resetPasswordUrl } from '../../url'
import axios, { AxiosResponse } from 'axios'
import { LoaderAction } from './loader.types'
import { Dispatch } from 'react'

import {
    SHOW_LOADER
} from './actionTypes'

export type TResetPasswordResponse = {
    success: boolean
    message: string
} & Response

export function resetPassword (data: { password: string; token: string }) {
    return function(dispatch: Dispatch<LoaderAction>) {
        dispatch({
            type: SHOW_LOADER, loader: true
        })
        
        return axios
        .post(resetPasswordUrl, data, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': getCookie('accessToken')
            }
        })
        .then<TResetPasswordResponse>((response: AxiosResponse) => {
            return response.data
        })
        .catch(error => {   
            console.error(error)
        })
        .finally(() => dispatch({
            type: SHOW_LOADER, loader: false
        }))
    }
}