import {
    ADD_INGREDIENT,
    DEL_INGREDIENT
} from './actionTypes'

export function setIngredient (ingredient) {
    return ingredient
        ? { type: ADD_INGREDIENT, ingredient: ingredient }
        : { type: DEL_INGREDIENT, ingredient: null }
}