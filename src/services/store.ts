import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import socketMiddleware from './middleware/socketMiddleware';
import rootReducer from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk), applyMiddleware(socketMiddleware()));

const initStore = (initialState = {}) => createStore(rootReducer, initialState, enhancer);
export default initStore;
