import { all } from 'redux-saga/effects';
import filmsSaga from './films/saga';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    filmsSaga()
  ]);
}
