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
    
    const res = yield call(httpFilms.updateFilmDetail, action.payload);
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
function* fetchUpdateFilmSchedule(action) {
  try {
    
    const res = yield call(httpFilms.updateFilmSchedule,action.id,action.payload);
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.UPDATE_FILM_SCHEDULE_SUCCESS, payload: data });
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

function* fetchCreateNewPaper(action) {
  try {
    const { payload } = action
    const res = yield call(httpFilms.createNewPaper, payload);
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.CREATE_NEW_SUCCESS, payload: data.data})
    }
  } catch (error) { console.log(error); }
}

function* fetchListNew(action) {
  try {
    const res = yield call(httpFilms.getListNews, {})
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LIST_NEW_SUCCESS, payload: data})
    }
  } catch (error) { console.log(error); }
}

function* fetchNewDetail(action) {
  try {
    const { payload } = action
    const res = yield call(httpFilms.getNewDetail, payload)
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.NEW_DETAIL_SUCCESS, payload: data})
    }
  } catch (error) { console.log(error); }
}

function* fetchUpdateNewDetail(action) {
  try {
    const { payload } = action
    const res = yield call(httpFilms.updateNewDetail, payload)
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.UPDATE_NEW_SUCCESS, payload: data})
    }
  } catch (error) { console.log(error); }
}

function* fetchTheaterDetail(action) {
  try {
    const { payload } = action
    const res = yield call(httpFilms.getTheaterDetail, payload)
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.THEATER_DETAIL_SUCCESS, payload: data})
    }
  } catch (error) { console.log(error); }
}

function* fetchTheaterUpdate(action) {
  try {
    const { payload } = action
    const res = yield call(httpFilms.updateTheaterDetail, payload)
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.THEATER_UPDATE_SUCCESS, payload: data})
    }
  } catch (error) { console.log(error); }
}

function* fetchRoomDetail(action) {
  try {
    const { payload } = action
    const res = yield call(httpFilms.getRoomDetail, payload)
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.ROOM_DETAIL_SUCCESS, payload: data})
    }
  } catch (error) { console.log(error); }
}

function* fetchUpdateRoom(action) {
  try {
    const { payload } = action
    const res = yield call(httpFilms.updateRoomDetail, payload)
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.ROOM_UPDATE_SUCCESS, payload: data})
    }
  } catch (error) { console.log(error); }
}

function* fetchCreateTheater(action) {
  try {
    const { payload, history } = action
    const res = yield call(httpFilms.createTheater, payload)
    const { status, data } = res
    if (status === "ok") {
      history.push(`/theater/${data._id}`)
      yield put({ type: FilmsType.CREATE_THEATER_SUCCESS, payload: data})
    }
  } catch (error) { console.log(error); }
}

function* fetchCreateRoom(action) {
  try {
    const { payload, history } = action
    const res = yield call(httpFilms.createRoom, payload)
    const { status, data } = res
    if (status === "ok") {
      history.push(`/room/${data._id}`)
      yield put({ type: FilmsType.ROOM_CREATE_SUCCESS, payload: data})
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
function* updateFilmSchedule(){
  yield takeEvery(FilmsType.UPDATE_FILM_SCHEDULE,fetchUpdateFilmSchedule)
}
function* getTheaters(){
  yield takeEvery(FilmsType.LIST_THEATER,fetchGetTheater)
}

function* createNewPaper() {
  yield takeEvery(FilmsType.CREATE_NEW, fetchCreateNewPaper);
}

function* getListNew() {
  yield takeEvery(FilmsType.LIST_NEW, fetchListNew);
}

function* getNewDetail() {
  yield takeEvery(FilmsType.NEW_DETAIL, fetchNewDetail);
}

function* updateNewDetail() {
  yield takeEvery(FilmsType.UPDATE_NEW, fetchUpdateNewDetail);
}

function* getTheaterDetail() {
  yield takeEvery(FilmsType.THEATER_DETAIL, fetchTheaterDetail);
}

function* updateTheater() {
  yield takeEvery(FilmsType.THEATER_UPDATE, fetchTheaterUpdate);
}

function* getRoomDetail() {
  yield takeEvery(FilmsType.ROOM_DETAIL, fetchRoomDetail);
}

function* updateRoom() {
  yield takeEvery(FilmsType.ROOM_UPDATE, fetchUpdateRoom);
}

function* createTheater() {
  yield takeEvery(FilmsType.CREATE_THEATER, fetchCreateTheater);
}

function* createRoom() {
  yield takeEvery(FilmsType.ROOM_CREATE, fetchCreateRoom);
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
    getTheaters(),
    createNewPaper(),
    getListNew(),
    getNewDetail(),
    updateNewDetail(),
    updateFilmSchedule(),
    getTheaterDetail(),
    updateTheater(),
    getRoomDetail(),
    updateRoom(),
    createTheater(),
    createRoom()
  ]);
}
