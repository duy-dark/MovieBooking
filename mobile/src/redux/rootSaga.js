import { all } from 'redux-saga/effects';
import usersSaga from './users/saga';
import filmsSaga from './films/saga';
import cinemasSaga from './cinemas/saga';
import newsSaga from './news/saga'

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    usersSaga(),
    filmsSaga(),
    cinemasSaga(),
    newsSaga()
  ]);
}
