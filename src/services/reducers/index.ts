import { combineReducers } from 'redux';
import {
  ingredientsReducer,
  activeTabReducer,
} from './burger-ingredients';
import { orderNumberReducer } from './order-details';
import { loaderReducer } from './loader';
import { wsReducer } from './wsReducer';
import { orderReducer } from './order';
import { userReducer } from './profile';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  activeTab: activeTabReducer,
  orderNumber: orderNumberReducer,
  loader: loaderReducer,
  messages: wsReducer,
  order: orderReducer,
  user: userReducer,
});
