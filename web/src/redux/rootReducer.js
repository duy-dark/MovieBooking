import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';

import usersReducer from './users/reducer';
import usersTypes from './users/types';

import filmsReducer from './films/reducer';
import filmsTypes from './films/types';

const rootReducer = combineReducers({
  users: filterActions(usersReducer, Object.values(usersTypes)),
  films: filterActions(filmsReducer, Object.values(filmsTypes)),
})

export default rootReducer;