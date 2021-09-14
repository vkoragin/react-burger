import { getCookie } from '../../utils'
import { profileUrl } from '../../url'
import axios from 'axios'

import {
    SHOW_LOADER
} from './actionTypes'

export function getUser () {
    return function(dispatch) {
        dispatch({
            type: SHOW_LOADER, loader: true
        })
        
        return axios
        .get(profileUrl, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': getCookie('accessToken')
            }
        })
        .then(response => response.data.user )
        .catch(error => {   
            console.error(error)
        })
        .finally(() => dispatch({
            type: SHOW_LOADER, loader: false
        }))
    }
}

export function updateUser (data) {
    return function(dispatch) {
        dispatch({
            type: SHOW_LOADER, loader: true
        })

        return axios
        .patch(profileUrl, data, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': getCookie('accessToken')
            }
        })
        .then(response => response.data.user)
        .catch(error => {   
            console.error(error)
        })
        .finally(() => dispatch({
            type: SHOW_LOADER, loader: false
        }))
    }
}
