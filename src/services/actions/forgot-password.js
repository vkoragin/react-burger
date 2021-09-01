import { getCookie } from '../../utils'
import { forgotPasswordUrl } from '../../url'
import axios from 'axios'

import {
    FORGOT_PASSWORD_SUCCESS,
    SHOW_LOADER
} from '../actions/actionTypes'

export function resetPassord (email) {
    return function(dispatch) {
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
        .then(response => {
            dispatch({type: FORGOT_PASSWORD_SUCCESS})
            return response.data
        })
        .catch(error => {   
            throw error
        })
        .finally(() => dispatch({
            type: SHOW_LOADER, loader: false
        }))
    }
}