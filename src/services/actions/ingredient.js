import {
    ADD_INGREDIENT,
    DEL_INGREDIENT
} from '../../constants'

export function setIngredient (ingredient) {
    return function(dispatch) {
        if (ingredient) {
            dispatch({
                type: ADD_INGREDIENT,
                ingredient: ingredient
            })
        } else {
            dispatch({
                type: DEL_INGREDIENT,
                ingredient: null
            })
        }
    }
}