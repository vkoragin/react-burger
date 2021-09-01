import { combineReducers } from 'redux'
import { ingredientsReducer, activeTabReducer } from './burger-ingredients'
import { orderNumberReducer } from './order-details'
import { loaderReducer } from './loader'

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    activeTab: activeTabReducer,
    orderNumber: orderNumberReducer,
    loader: loaderReducer
})