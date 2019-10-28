import { combineReducers } from 'redux';
import { reduxTokenAuthReducer } from 'redux-token-auth'
import bug from './bug'
const rootReducer = combineReducers({
  reduxTokenAuth: reduxTokenAuthReducer,
  bug,
})

export default rootReducer