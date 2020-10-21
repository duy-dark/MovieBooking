import { combineReducers } from 'redux';
import users from './users';
import layout from './layout';


const rootReducer = combineReducers({
  users: users,
  layout: layout,
});

export default rootReducer;
