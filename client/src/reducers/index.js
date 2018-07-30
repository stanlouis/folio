import { combineReducers } from 'redux';
import portfolios from './portfolios_reducer';
import user from './user_reducer';

const rootReducer = combineReducers({
  portfolios,
  user
});

export default rootReducer;
