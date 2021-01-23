import { all, takeEvery, put, call } from "redux-saga/effects";
import UsersTypes from "./types";
import httpUser from "../../api/customers";

function* fetchLogin(action) {
  try {
    let { history } = action;
    const data = yield call(httpUser.login, action.payload);
    const { status, data: newData } = data;
    if (status === "ok") {
      yield put({ type: UsersTypes.LOGIN_SUCCESS, payload: newData });
      history.push("/");
    }
  } catch (err) {
    throw err;
  }
}

function* fetchListFriend() {
  try {
    const data = yield call(httpUser.getFriends, {});
    const { status, data: newData } = data;
    if (status === "ok") {
      yield put({ type: UsersTypes.LIST_FRIEND_SUCCESS, payload: newData });
    }
  } catch (err) {
    throw err;
  }
}

function* fetchUserInfo() {
  try {
    const data = yield call(httpUser.getUserInfo, {});
    const { status, data: newData } = data;
    if (status === "ok") {
      yield put({ type: UsersTypes.USER_INFO_SUCCESS, payload: newData });
    }
  } catch (err) {
    throw err;
  }
}

function* fetchUDSFriend(action) {
  try {
    yield put({ type: UsersTypes.UDS_FRIEND_SUCCESS, payload: action.payload });
  } catch (err) {
    throw err;
  }
}

function* fetchLogout(action) {
  try {
    let { history } = action;
    yield put({ type: UsersTypes.LOGOUT_SUCCESS });
    history.push("/login");
  } catch (err) {
    throw err;
  }
}

function* signup() {
  yield takeEvery(UsersTypes.LOGIN, fetchLogin);
}

function* getListFriend() {
  yield takeEvery(UsersTypes.LIST_FRIEND, fetchListFriend);
}

function* getUserInfo() {
  yield takeEvery(UsersTypes.USER_INFO, fetchUserInfo);
}

function* updateStatusFriend() {
  yield takeEvery(UsersTypes.UDS_FRIEND, fetchUDSFriend);
}

function* signout() {
  yield takeEvery(UsersTypes.LOGOUT, fetchLogout);
}

export default function* usersSaga() {
  yield all([signup(), getListFriend(), getUserInfo(), updateStatusFriend(), signout()]);
}
