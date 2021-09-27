import { getCookie } from '../../utils'
import { forgotPasswordUrl } from '../../url'
import axios, { AxiosResponse } from 'axios'
import { LoaderAction } from './loader.types'
import { Dispatch } from 'react'

import {
    SHOW_LOADER
} from './actionTypes'

export type TForgotPasswordResponse = {
    success: boolean
    message: string
} & Response

export function resetPassword (email: string) {
    return function(dispatch: Dispatch<LoaderAction>) {
        dispatch({
            type: SHOW_LOADER, loader: true
        })
        
        return axios
        .post(forgotPasswordUrl, {email: email}, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': getCookie('accessToken')
            }
        })
        .then<TForgotPasswordResponse>((response: AxiosResponse) => {
            localStorage.setItem('resetPassword', 'true')
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