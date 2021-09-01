import { combineReducers } from 'redux'
import { ingredientsReducer, activeTabReducer } from './burger-ingredients'
import { orderNumberReducer } from './order-details'
import { ingredientReducer } from './ingredient'
import { forgotPasswordReducer } from './forgot-password'
import { loaderReducer } from './loader'

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    activeTab: activeTabReducer,
    orderNumber: orderNumberReducer,
    ingredient: ingredientReducer,
    forgotPassword: forgotPasswordReducer,
    loader: loaderReducer
})