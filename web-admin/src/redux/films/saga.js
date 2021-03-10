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
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.addNewFilm,action.payload);
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.ADD_NEW_FILM_SUCCESS, payload: data });
    }
  } catch (error) { console.log(error); }
}
function* fetchFilmDetails(action) {
  try {
    const { payload } = action;
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.getDetail, payload);
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.FILM_DETAIL_SUCCESS, payload: data });
    }

  } catch (error) { console.log(error); }
}

function* fetchListFilmsNow() {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.getListFilmNow, {});
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LIST_FILM_NOW_SUCCESS, payload: data });
    }

  } catch (error) { console.log(error); }
}

function* fetchListFilmsFuture() {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.getListFilmFuture, {});
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LIST_FILM_FUTURE_SUCCESS, payload: data });
    }

  } catch (error) { console.log(error); }
}

function* fetchListTicket() {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.getListTicket, {});
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LIST_TICKET_SUCCESS, payload: data });
    }

  } catch (error) { console.log(error); }
}

function* fetchListFilmsToday() {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.getListFilmToday, {});
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LIST_FILM_TODAY_SUCCESS, payload: data });
    }

  } catch (error) { console.log(error); }
}

function* fetchSeats(action) {
  try {
    const { payload } = action
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.getSeats, payload);
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LIST_SEATS_SUCCESS, payload: data });
    }

  } catch (error) { console.log(error); }
}

function* fetchFilmUpdate(action){
  try{
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.updateFilmDetail, action.id,action.payload);
    yield put({ type: FilmsType.LOADING_HIDE});
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.UPDATE_FILM_DETAIL_SUCCESS, payload: data });
    }

  }catch (error) { console.log(error); }
}
function* fetchListCategory() {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.getCategories, {});
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LIST_CATEGOGY_SUCCESS, payload: data });
     
    }

  } catch (error) { console.log(error); }
}
function* fetchFilmSchedule(action) {
  try {
    const { payload } = action
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.getFilmSchedule, payload);
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.FILM_SCHEDULE_SUCCESS, payload: data });
    }

  } catch (error) { console.log(error); }
}
function* fetchUpdateFilmSchedule(action) {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.updateFilmSchedule,action.id,action.payload);
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.UPDATE_FILM_SCHEDULE_SUCCESS, payload: data });
    }

  } catch (error) { alert("LỊCH CHIẾU ĐÃ TỒN TẠI!"); }
}
function* fetchDeleteFilmSchedule(action) {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.deleteFilmSchedule,action.payload);
    yield put({ type: FilmsType.LOADING_HIDE});
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.DELETE_FILM_SCHEDULE_SUCCESS, payload: data });
    }

  } catch (error) {console.log(error); }
}
function* fetchCreateFilmSchedule(action) {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.createSchedule,action.payload);
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.CREATE_FILM_SCHEDULE_SUCCESS, payload: data });
    }

  } catch (error) { alert("LỊCH CHIẾU ĐÃ TỒN TẠI!"); }
}
function* fetchGetTheater() {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.getTheater, {});
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LIST_THEATER_SUCCESS, payload: data });
     
    }

  } catch (error) { console.log(error); }
}

function* fetchCreateNewPaper(action) {
  try {
    const { payload } = action
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.createNewPaper, payload);
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.CREATE_NEW_SUCCESS, payload: data.data})
    }
  } catch (error) { console.log(error); }
}

function* fetchListNew(action) {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.getListNews, {})
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LIST_NEW_SUCCESS, payload: data})
    }
  } catch (error) { console.log(error); }
}

function* fetchNewDetail(action) {
  try {
    const { payload } = action
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.getNewDetail, payload)
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.NEW_DETAIL_SUCCESS, payload: data})
    }
  } catch (error) { console.log(error); }
}

function* fetchUpdateNewDetail(action) {
  try {
    const { payload } = action
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.updateNewDetail, payload)
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.UPDATE_NEW_SUCCESS, payload: data})
    }
  } catch (error) { console.log(error); }
}

function* fetchTheaterDetail(action) {
  try {
    const { payload } = action
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.getTheaterDetail, payload)
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.THEATER_DETAIL_SUCCESS, payload: data})
    }
  } catch (error) { console.log(error); }
}

function* fetchTheaterUpdate(action) {
  try {
    const { payload } = action
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.updateTheaterDetail, payload)
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.THEATER_UPDATE_SUCCESS, payload: data})
    }
  } catch (error) { console.log(error); }
}

function* fetchRoomDetail(action) {
  try {
    const { payload } = action
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.getRoomDetail, payload)
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.ROOM_DETAIL_SUCCESS, payload: data})
    }
  } catch (error) { console.log(error); }
}

function* fetchUpdateRoom(action) {
  try {
    const { payload } = action
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.updateRoomDetail, payload)
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.ROOM_UPDATE_SUCCESS, payload: data})
    }
  } catch (error) { console.log(error); }
}

function* fetchCreateTheater(action) {
  try {
    const { payload, history } = action
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.createTheater, payload)
    yield put({ type: FilmsType.LOADING_HIDE });
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
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.createRoom, payload)
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      history.push(`/room/${data._id}`)
      yield put({ type: FilmsType.ROOM_CREATE_SUCCESS, payload: data})
    }
  } catch (error) { console.log(error); }
}

function* fetchDeleteTheater(action) {
  try {
    const { payload } = action
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.deleteTheater, payload);
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.DELETE_THEATER_SUCCESS, payload: data})
    }
  } catch (error) { console.log(error); }
}

function* fetchDeleteRoom(action) {
  try {
    const { payload } = action
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.deleteRoom, payload);
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.DELETE_ROOM_SUCCESS, payload: data})
    }
  } catch (error) { console.log(error); }
}

function* fetchTheaterChart(action) {
  try {
    const { payload } = action
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.getTheaterChart, payload)
    yield put({ type: FilmsType.LOADING_HIDE });
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.THEATER_CHART_SUCCESS, payload: data})
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
function* deleteFilmSchedule(){
  yield takeEvery(FilmsType.DELETE_FILM_SCHEDULE,fetchDeleteFilmSchedule)
}
function* createFilmSchedule(){
  yield takeEvery(FilmsType.CREATE_FILM_SCHEDULE,fetchCreateFilmSchedule)
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
function* getListTicket() {
  yield takeEvery(FilmsType.LIST_TICKET, fetchListTicket);
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

function* deteleTheater() {
  yield takeEvery(FilmsType.DELETE_THEATER, fetchDeleteTheater);
}

function* deteleRoom() {
  yield takeEvery(FilmsType.DELETE_ROOM, fetchDeleteRoom);
}

function* getTheaterChart() {
  yield takeEvery(FilmsType.THEATER_CHART, fetchTheaterChart)
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
    updateFilmSchedule(),
    createFilmSchedule(),
    getListNew(),
    getNewDetail(),
    updateNewDetail(),
    getListTicket(),
    getTheaterDetail(),
    updateTheater(),
    getRoomDetail(),
    deleteFilmSchedule(),
    updateRoom(),
    createTheater(),
    createRoom(),
    deteleTheater(),
    deteleRoom(),
    getTheaterChart(),
  ]);
}
