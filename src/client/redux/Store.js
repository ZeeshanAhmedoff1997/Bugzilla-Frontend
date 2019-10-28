import { applyMiddleware, createStore ,compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import initialState from '../redux/ initial-state';
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk, createLogger()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
