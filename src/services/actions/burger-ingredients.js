import { getIngredientsUrl } from '../../url.js'
import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    ACTIVE_TAB
} from '../../constants'

export function getIngredients () {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS
        })
        
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
    }
}

export function setActiveTab (activeTab) {
    return function(dispatch) {
        dispatch({
            type: ACTIVE_TAB,
            activeTab: activeTab
        })
    }
}
