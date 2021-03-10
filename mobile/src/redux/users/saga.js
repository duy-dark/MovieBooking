import { all, takeEvery, put, call } from "redux-saga/effects";
import UsersTypes from "./types";
import httpUser from "../../api/customers";

const removeData = async (storage) => {
  try {
      await AsyncStorage.removeItem(storage);
      return true;
  }
  catch(exception) {
      return false;
  }
}

function* fetchLogin(action) {
  const { navigation } = action
  try {
    yield put({ type: UsersTypes.LOADING_SHOW });
    const res = yield call(httpUser.login, action.payload);
    yield put({ type: UsersTypes.LOADING_HIDE });
    if (res.status === "ok") {
      yield put({ type: UsersTypes.LOGIN_SUCCESS, payload: res.data });
      if(res.data.is_newbie) {
        navigation.navigate("SelectCategories")
      }
      else navigation.navigate("MainTabs")
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
  const { navigation } = action
  try {
    yield put({ type: UsersTypes.LOADING_SHOW });
    const res = yield call(httpUser.getUserInfo, action.payload);

    yield put({ type: UsersTypes.LOADING_HIDE });
    if (res.status === "ok") {
      yield put({ type: UsersTypes.LOGIN_SUCCESS, payload: res.data });
      navigation.navigate("MainTabs")
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
    const { navigation } = action
    yield put({ type: UsersTypes.LOGOUT_SUCCESS });
    navigation.navigate("LoginScreen")
    // alert("LoginScreen")
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

function* fetchCategories() {
  try {
    yield put({ type: UsersTypes.LOADING_SHOW });
    const res = yield call(httpUser.getCategories, {});
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: UsersTypes.LOADING_HIDE });
      yield put({ type: UsersTypes.GET_CATEGORIES_SUCCESS, payload: data });
    }

  } catch (error) { throw error; }
}

function* fetchPostCategories(action) {
  try {
    yield put({ type: UsersTypes.LOADING_SHOW });
    const { payload, navigation, sc } = action
    const res = yield call(httpUser.postCategories, payload);
    const { status, data } = res

    if (status === "ok") {
      if(sc===1) {
        navigation.navigate("MainTabs")
      } else navigation.goBack()
      yield put({ type: UsersTypes.LOADING_HIDE });
      yield put({ type: UsersTypes.POST_CATEGORIES_SUCCESS, payload: data.customer});

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

function* getCategories() {
  yield takeEvery(UsersTypes.GET_CATEGORIES, fetchCategories);
}

function* postCategories() {
  yield takeEvery(UsersTypes.POST_CATEGORIES, fetchPostCategories);
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
    getCategories(),
    postCategories()
  ]);
}
