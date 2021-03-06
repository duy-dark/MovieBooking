import { all, takeEvery, put, call } from "redux-saga/effects";
import UsersTypes from "./types";
import httpUser from "../../api/customers";

function* fetchLogin(action) {
  try {
    yield put({ type: UsersTypes.LOADING_SHOW});
    let { history } = action;
    const res = yield call(httpUser.login, action.payload);
    yield put({ type: UsersTypes.LOADING_HIDE});
    if (res.status === "ok") {
      yield put({ type: UsersTypes.LOGIN_SUCCESS, payload: res.data });

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

function* fetchUserInfo(action) {
  try {
    yield put({ type: UsersTypes.LOADING_SHOW});
    const res = yield call(httpUser.getUserInfo, action.payload);
    yield put({ type: UsersTypes.LOADING_HIDE});

    if (res.status === "ok") {
      yield put({ type: UsersTypes.LOGIN_SUCCESS, payload: res.data });
    } else {
      yield put({ type: UsersTypes.LOGOUT_SUCCESS });
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

function* fetchUpdateHF(action) {
  try {
    let { status } = action;
    yield put({ type: UsersTypes.UPDATE_HF_SUCCESS, payload: status });
  } catch (err) {
    throw err;
  }
}

function* fetchLoginTest(action) {
  try {
    let { user, history } = action;
    yield put({ type: UsersTypes.LOGIN_TEST_SUCCESS, payload: user });
    history.push("/");
  } catch (err) {
    throw err;
  }
}

function* fetchTicketsInfo(action) {
  try {
    yield put({ type: UsersTypes.LOADING_SHOW});
    const res = yield call(httpUser.getTicketsInfo, action.payload);

    if (res.status === "ok") {
      yield put({ type: UsersTypes.TICKET_INFO_SUCCESS, payload: res.data });
      yield put({ type: UsersTypes.LOADING_HIDE});
    }
  } catch (err) {
    throw err;
  }
}

function* signIn() {
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

function* signOut() {
  yield takeEvery(UsersTypes.LOGOUT, fetchLogout);
}

function* signTest() {
  yield takeEvery(UsersTypes.LOGIN_TEST, fetchLoginTest);
}

function* updateHF() {
  yield takeEvery(UsersTypes.UPDATE_HF, fetchUpdateHF);
}

function* ticketInfo() {
  yield takeEvery(UsersTypes.TICKET_INFO, fetchTicketsInfo);
}

export default function* usersSaga() {
  yield all([
    signIn(),
    getListFriend(),
    getUserInfo(),
    updateStatusFriend(),
    signOut(),
    signTest(),
    updateHF(),
    ticketInfo()
  ]);
}
