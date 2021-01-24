import { all } from 'redux-saga/effects';
import usersSaga from './users/saga';
import filmsSaga from './films/saga';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    usersSaga(),
    filmsSaga(),
  ]);
}
