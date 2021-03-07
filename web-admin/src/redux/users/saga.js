import { all, takeEvery, put, call } from "redux-saga/effects";
import UsersTypes from "./types";
import httpUser from "../../api/customers";

function* fetchLogin(action) {
  try {
    let { history } = action;
    const res = yield call(httpUser.Login, action.payload);
    if (res.status === "ok") {
      yield put({ type: UsersTypes.LOGIN_SUCCESS, payload: res.data });
      history.push("/");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}



function* fetchUserInfo(action) {
  try {
    const res = yield call(httpUser.getUserInfo, action.payload);

    if (res.status === "ok") {
      yield put({ type: UsersTypes.USER_INFO_SUCCESS, payload: res.data });
    }
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



function* fetchLoginTest(action) {
  try {
    let { user, history } = action;
    yield put({ type: UsersTypes.LOGIN_TEST_SUCCESS, payload: user });
    history.push("/");
  } catch (err) {
    throw err;
  }
}

function* signIn() {
  yield takeEvery(UsersTypes.LOGIN, fetchLogin);
}



function* getUserInfo() {
  yield takeEvery(UsersTypes.USER_INFO, fetchUserInfo);
}


function* signOut() {
  yield takeEvery(UsersTypes.LOGOUT, fetchLogout);
}

function* signTest() {
  yield takeEvery(UsersTypes.LOGIN_TEST, fetchLoginTest);
}



export default function* usersSaga() {
  yield all([
    signIn(),

    getUserInfo(),
    
    signOut(),
    signTest(),
   
  ]);
}
