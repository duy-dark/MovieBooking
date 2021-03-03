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
      yield put({ type: FilmsType.LIST_FILM_NOW_SUCCESS, payload: data });
      yield put({ type: FilmsType.LOADING_HIDE });
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
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.getListFilmToday, {});
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LOADING_HIDE });
      yield put({ type: FilmsType.LIST_FILM_TODAY_SUCCESS, payload: data });
    }

  } catch (error) { console.log(error); }
}

function* fetchSeats(action) {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const { payload } = action
    const res = yield call(httpFilms.getSeats, payload);
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LOADING_HIDE });
      yield put({ type: FilmsType.LIST_SEATS_SUCCESS, payload: data });
    }

  } catch (error) { console.log(error); }
}

function* fetchSearch() {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.search, {});
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LOADING_HIDE });
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
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const { payload } = action
    const res = yield call(httpFilms.createComment, payload);
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LOADING_HIDE });
      yield put({ type: FilmsType.CREATE_COMMENT_SUCCESS, payload: data.comment });
    }

  } catch (error) { console.log(error); }
}

function* fetchPaymentGate(action) {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const { payload, history } = action
    // console.log(history)

    const res = yield call(httpFilms.paymentMomo, payload);
    yield put({ type: FilmsType.LOADING_HIDE });
    const { data } = res
    history.location.href = data.url1
  } catch (error) { console.log(error); }
}

function* fetchListNew(action) {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.getAllNews, {})
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LOADING_HIDE });
      yield put({ type: FilmsType.LIST_NEW_SUCCESS, payload: data });
    }
  } catch (error) { console.log(error); }
}

function* fetchNewDetail(action) {
  try {
    const { payload } = action
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.getNewDetail, payload)
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LOADING_HIDE });
      yield put({ type: FilmsType.NEW_DETAIL_SUCCESS, payload: data });
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

function* paymentGateway() {
  yield takeEvery(FilmsType.PAYMENT_MOMO, fetchPaymentGate);
}

function* createComment() {
  yield takeEvery(FilmsType.CREATE_COMMENT, fetchCreateComment);
}

function* getListNew() {
  yield takeEvery(FilmsType.LIST_NEW, fetchListNew)
}

function* getNewDetail() {
  yield takeEvery(FilmsType.NEW_DETAIL, fetchNewDetail)
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
    paymentGateway(),
    createComment(),
    getListNew(),
    getNewDetail()
  ]);
}
