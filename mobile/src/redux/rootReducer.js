import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';

import usersReducer from './users/reducer';
import usersTypes from './users/types';

import filmsReducer from './films/reducer';
import filmsTypes from './films/types';

import cinemasReducer from './cinemas/reducer';
import cinemasTypes from './cinemas/types'
import newsReducer from './news/reducer';
import newsTypes from './news/types'

const rootReducer = combineReducers({
  users: filterActions(usersReducer, Object.values(usersTypes)),
  films: filterActions(filmsReducer, Object.values(filmsTypes)),
  cinemas: filterActions(cinemasReducer, Object.values(cinemasTypes)),
  news: filterActions(newsReducer, Object.values(newsTypes))
})

export default rootReducer;