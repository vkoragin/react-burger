import { getIngredientsUrl } from '../../url.js'
import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    SHOW_LOADER,
    ACTIVE_TAB
} from './actionTypes'

export function getIngredients () {
    return function(dispatch) {
        dispatch({type: GET_INGREDIENTS})
        dispatch({type: SHOW_LOADER, loader: true})
        
        fetch(getIngredientsUrl)
        .then( res  => {
            if (res.ok) return res.json()
            return Promise.reject(res.status)
        })
        .then(ingredients => {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: ingredients.data
            })
        })
        .catch(() => {            
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        })
        .finally(() => dispatch({
            type: SHOW_LOADER, loader: false
        }))
    }
}

export function setActiveTab (activeTab) {
    return {
        type: ACTIVE_TAB,
        activeTab
    }
}
