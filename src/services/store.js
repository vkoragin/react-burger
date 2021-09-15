import { createStore, applyMiddleware, compose } from 'redux'
import { socketMiddleware } from '../services/middleware/socketMiddleware'
import thunk from 'redux-thunk'
import { rootReducer } from '../services/reducers'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

export const initStore = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk), applyMiddleware(socketMiddleware()))
  )