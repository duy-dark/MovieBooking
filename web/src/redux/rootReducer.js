import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';

import usersReducer from './users/reducer';
import usersTypes from './users/types';

const rootReducer = combineReducers({
  users: filterActions(usersReducer, Object.values(usersTypes)),
})

export default rootReducer;