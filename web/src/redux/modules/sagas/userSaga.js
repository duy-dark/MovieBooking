import { call, put, takeEvery } from 'redux-saga/effects';
import ApiCustomer from '../../../api/customers';

function* fetchUsers(action) {
  try {
    const payload = yield call(ApiCustomer.login({}));
    yield put({ type: 'LOGIN_SUCCESS', payload: payload });
  } catch (err) { throw err; }
}

function* userSaga() {
  yield takeEvery('LOGIN', fetchUsers);
}

export default userSaga
