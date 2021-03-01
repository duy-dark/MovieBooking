import { all, takeEvery, put, call } from "redux-saga/effects";
import FilmsType from "./types";
import httpFilms from "../../api/films";

function* fetchPostBookingInfo(action) {
  try {
    const res = yield call(httpFilms.postBookingInfo, action.payload);
    if (res.status === "ok") {
      yield put({ type: FilmsType.POST_BOOKING_INFO_SUCCESS, payload: res.data });
      action.history.push({
        pathname: "/completed",
        state: {
          email: action.payload.email,
          phone_number: action.payload.phone_number,
        },
      });
    }
  } catch (error) {
    throw error;
  }
}

function* fetchFilmDetails(action) {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const { payload } = action;
    const res = yield call(httpFilms.getDetail, payload);
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LOADING_HIDE });
      yield put({ type: FilmsType.FILM_DETAIL_SUCCESS, payload: data });
    }

  } catch (error) { console.log(error); }
}

function* fetchListFilmsNow() {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.getListFilmNow, {});
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LOADING_HIDE });
      yield put({ type: FilmsType.LIST_FILM_NOW_SUCCESS, payload: data });
    }

  } catch (error) { console.log(error); }
}

function* fetchListFilmsFuture() {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.getListFilmFuture, {});
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LOADING_HIDE });
      yield put({ type: FilmsType.LIST_FILM_FUTURE_SUCCESS, payload: data });
    }

  } catch (error) { console.log(error); }
}

function* fetchListFilmsToday() {
  try {
    const res = yield call(httpFilms.getListFilmToday, {});
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LIST_FILM_TODAY_SUCCESS, payload: data });
    }

  } catch (error) { console.log(error); }
}

function* fetchSeats(action) {
  try {
    const { payload } = action
    const res = yield call(httpFilms.getSeats, payload);
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LIST_SEATS_SUCCESS, payload: data });
    }

  } catch (error) { console.log(error); }
}

function* fetchSearch() {
  try {
    const res = yield call(httpFilms.search, {});
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.SEARCH_SUCCESS, payload: data });
    }

  } catch (error) { console.log(error); }
}

function* fetchComments(action) {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const { payload } = action
    const res = yield call(httpFilms.getComments, payload);
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LOADING_HIDE });
      yield put({ type: FilmsType.COMMENT_SUCCESS, payload: data });
    }
  } catch (error) { console.log(error); }
}

function* fetchCreateComment(action) {
  const { navigation } = action
  try {
    // yield put({ type: FilmsType.LOADING_SHOW });
    const { payload } = action
    const res = yield call(httpFilms.createComment, payload);
    const { status, data } = res
    if (status === "ok") {
      // yield put({ type: FilmsType.LOADING_HIDE });
      yield put({ type: FilmsType.CREATE_COMMENT_SUCCESS, payload: data.comment });
      navigation.goBack()
    }

  } catch (error) { console.log(error); }
}


function* postBookingInfo() {
  yield takeEvery(FilmsType.POST_BOOKING_INFO, fetchPostBookingInfo);
}

function* getFilmDetails() {
  yield takeEvery(FilmsType.FILM_DETAIL, fetchFilmDetails);
}

function* getFilmsNow() {
  yield takeEvery(FilmsType.LIST_FILM_NOW, fetchListFilmsNow);
}

function* getFilmsFuture() {
  yield takeEvery(FilmsType.LIST_FILM_FUTURE, fetchListFilmsFuture);
}

function* getFilmsToday() {
  yield takeEvery(FilmsType.LIST_FILM_TODAY, fetchListFilmsToday);
}

function* getSeats() {
  yield takeEvery(FilmsType.LIST_SEATS, fetchSeats);
}

function* getSearch() {
  yield takeEvery(FilmsType.SEARCH, fetchSearch)
}

function* getComments() {
  yield takeEvery(FilmsType.COMMENT, fetchComments);
}

function* createComment() {
  yield takeEvery(FilmsType.CREATE_COMMENT, fetchCreateComment);
}


export default function* filmsSaga() {
  yield all([
    postBookingInfo(),
    getFilmDetails(),
    getFilmsNow(),
    getFilmsFuture(),
    getFilmsToday(),
    getSeats(),
    getSearch(),
    getComments(),
    createComment()
  ]);
}
