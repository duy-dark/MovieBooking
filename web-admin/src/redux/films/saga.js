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
    console.log("fetchPostBookingInfo Error", error);
    throw error;
  }
}
function* fetchAddNewFilm(action){
  try {
    const res = yield call(httpFilms.addNewFilm,action.payload);
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.ADD_NEW_FILM_SUCCESS, payload: data });
    }
  } catch (error) { console.log(error); }
}
function* fetchFilmDetails(action) {
  try {
    const { payload } = action;
    const res = yield call(httpFilms.getDetail, payload);
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.FILM_DETAIL_SUCCESS, payload: data });
    }

  } catch (error) { console.log(error); }
}

function* fetchListFilmsNow() {
  try {
    const res = yield call(httpFilms.getListFilmNow, {});
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LIST_FILM_NOW_SUCCESS, payload: data });
    }

  } catch (error) { console.log(error); }
}

function* fetchListFilmsFuture() {
  try {
    const res = yield call(httpFilms.getListFilmFuture, {});
    const { status, data } = res
    if (status === "ok") {
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

function* fetchFilmUpdate(action){
  try{
    const { payload } = action
    const res = yield call(httpFilms.updateFilmDetail, payload);
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.UPDATE_FILM_DETAIL_SUCCESS, payload: data });
    }

  }catch (error) { console.log(error); }
}
function* fetchListCategory() {
  try {
    const res = yield call(httpFilms.getCategories, {});
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LIST_CATEGOGY_SUCCESS, payload: data });
     
    }

  } catch (error) { console.log(error); }
}
function* fetchFilmSchedule(action) {
  try {
    const { payload } = action
    const res = yield call(httpFilms.getFilmSchedule, payload);
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.FILM_SCHEDULE_SUCCESS, payload: data });
    }

  } catch (error) { console.log(error); }
}
function* fetchGetTheater() {
  try {
    const res = yield call(httpFilms.getTheater, {});
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LIST_THEATER_SUCCESS, payload: data });
     
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
function* getFilmUpdate() {
  yield takeEvery(FilmsType.UPDATE_FILM_DETAIL, fetchFilmUpdate);
}
function* getCategories(){
  yield takeEvery(FilmsType.LIST_CATEGOGY,fetchListCategory)
}
function* addNewFilm(){
  yield takeEvery(FilmsType.ADD_NEW_FILM,fetchAddNewFilm)
}
function* filmSchedule(){
  yield takeEvery(FilmsType.FILM_SCHEDULE,fetchFilmSchedule)
}
function* getTheaters(){
  yield takeEvery(FilmsType.LIST_THEATER,fetchGetTheater)
}
export default function* filmsSaga() {
  yield all([
    postBookingInfo(),
    getFilmDetails(),
    getFilmsNow(),
    getFilmsFuture(),
    getFilmsToday(),
    getSeats(),
    getFilmUpdate(),
    getCategories(),
    addNewFilm(),
    filmSchedule(),
    getTheaters()
  ]);
}
