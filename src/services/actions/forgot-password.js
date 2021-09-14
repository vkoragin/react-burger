import { getCookie } from '../../utils'
import { forgotPasswordUrl } from '../../url'
import axios from 'axios'

import {
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