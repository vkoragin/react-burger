import { TIngredient } from '../../types'

export type ActiveTabStore = {
    activeTab: string
}

export type BurgerIngredientStore = {
    ingredients: TIngredient[]
    ingredientsRequest: boolean
    ingredientsFailed: boolean
    constructor: TIngredient[]
}