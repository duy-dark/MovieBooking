import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';

import filmsReducer from './films/reducer';
import filmsTypes from './films/types';

const rootReducer = combineReducers({
  films: filterActions(filmsReducer, Object.values(filmsTypes))
})

export default rootReducer;