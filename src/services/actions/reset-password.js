import { getCookie } from '../../utils'
import { resetPasswordUrl } from '../../url'
import axios from 'axios'

import {
    SHOW_LOADER
} from '../actions/actionTypes'

export function resetPassord (data) {
    return function(dispatch) {
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
        .then(response => {
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