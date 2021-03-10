import { all, takeEvery, put, call } from "redux-saga/effects";
import UsersTypes from "./types";
import httpUser from "../../api/customers";

function* fetchLogin(action) {
  try {
    let { history } = action;
    yield put({ type: UsersTypes.LOADING_SHOW});  
    const res = yield call(httpUser.Login, action.payload);
    yield put({ type: UsersTypes.LOADING_HIDE});
    if (res.status === "ok") {
      yield put({ type: UsersTypes.LOGIN_SUCCESS, payload: res.data });
      history.push("/");
    }
  } catch (err) {
    throw err;
  }
}



function* fetchUserInfo(action) {
  try {
    yield put({ type: UsersTypes.LOADING_SHOW});  
    const res = yield call(httpUser.getAdminInfo, action.payload);
    yield put({ type: UsersTypes.LOADING_HIDE});
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

function* fetchListCustomer() {
  try {
    yield put({ type: UsersTypes.LOADING_SHOW});  
    const res = yield call(httpUser.getListCustomers, {});
    const { status, data } = res
    yield put({ type: UsersTypes.LOADING_HIDE});
    if (status === "ok") {
      yield put({ type: UsersTypes.LIST_CUSTOMER_SUCCESS, payload: data });
    }
  } catch (err) { throw err; }
}

function* signIn() {
  yield takeEvery(UsersTypes.LOGIN, fetchLogin);
}

function* fetchUpdateCustomer(action) {
  try {
    const { payload } = action
    yield put({ type: UsersTypes.LOADING_SHOW});  
    const res = yield call(httpUser.updateCustomer, payload);
    const { status, data } = res
    yield put({ type: UsersTypes.LOADING_HIDE});
    if (status === "ok") {
      yield put({ type: UsersTypes.UPDATE_CUSTOMER_SUCCESS, payload: data });
    }
  } catch(err) { throw err; }
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

function* getListCustomer() {
  yield takeEvery(UsersTypes.LIST_CUSTOMER, fetchListCustomer);
}

function* updateCustomer() {
  yield takeEvery(UsersTypes.UPDATE_CUSTOMER, fetchUpdateCustomer);
}

export default function* usersSaga() {
  yield all([
    signIn(),
    getUserInfo(),
    getListCustomer(),
    signOut(),
    signTest(),
    updateCustomer()
  ]);
}
