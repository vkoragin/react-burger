import { setCookie, deleteCookie } from '../../utils'
import { loginUrl, registrUrl, logoutUrl, refrechTokenUrl } from '../../url'
import axios from 'axios'

import {
    SHOW_LOADER
} from './actionTypes'

export function loginUser (data) {
    return function(dispatch) {
        dispatch({
            type: SHOW_LOADER, loader: true
        })
        
        return axios
        .post(loginUrl, data, {
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        })
        .then(response => {
            setCookie('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
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

export function registerUser (data) {
    return function(dispatch) {    
        dispatch({
            type: SHOW_LOADER, loader: true
        })
        
        return axios
        .post(registrUrl, data, {
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        })
        .then(response => {
            setCookie('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
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

export function logoutUser () {
    return function(dispatch) {
        dispatch({
            type: SHOW_LOADER, loader: true
        })
        
        return axios
        .post(logoutUrl, {token: localStorage.refreshToken}, {
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        })
        .then(response => {
            deleteCookie('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('resetPassword')
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

export function refreshToken () {
    return function(dispatch) {
        dispatch({
            type: SHOW_LOADER, loader: true
        })

        return axios
        .post(refrechTokenUrl, {token: localStorage.refreshToken}, {
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        })
        .then(response => {
            setCookie('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
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
