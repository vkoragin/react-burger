import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { BurgerIngredientStore, ActiveTabStore } from './reducers/burger-ingredient.types';
import { LoaderStore } from './reducers/loader.types';
import { OrderNumberStore } from './reducers/order-details.type';
import { OrderStore } from './reducers/order.types';
import { UserStore } from './reducers/profile.types';
import { WsStore } from './reducers/wsReducer.type';

import { Actions as BurgerIngredientsActions } from './actions/burgrer-ingredients.types';
import { LoaderAction } from './actions/loader.types';
import { Actions as WsActions } from './actions/wsActionTypes';
import { Actions as GetOrderNumberActions } from './actions/order-details.type';
import { Actions as UserActions } from './actions/profile.types';

type ApplicationActions =
  | BurgerIngredientsActions
  | LoaderAction
  | WsActions
  | GetOrderNumberActions
  | UserActions;

export type AppDispatch = Dispatch<ApplicationActions>;

export type ReduxStore = {
  ingredients: BurgerIngredientStore;
  loader: LoaderStore;
  orderNumber: OrderNumberStore;
  messages: WsStore;
  activeTab: ActiveTabStore;
  order: OrderStore;
  user: UserStore;
};

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, ReduxStore, ApplicationActions>
>;
