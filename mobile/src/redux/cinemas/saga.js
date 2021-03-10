import { all, takeEvery, put, call } from "redux-saga/effects";
import CinemaType from "./types";
import httpCinemas from "../../api/cinemas";
 
function* fetchListCinemas() {
    try {
      yield put({ type: CinemaType.LOADING_SHOW });
      const res = yield call(httpCinemas.getListCinemas, {});
      const { status, data } = res
      if (status === "ok") {
        yield put({ type: CinemaType.LOADING_HIDE });
        yield put({ type: CinemaType.LIST_CINEMAS_SUCCESS, payload: data });
      }
  
    } catch (error) { throw error; }
}

function* fetchCinemaDetails(action) {
    try {
      yield put({ type: CinemaType.LOADING_SHOW });
      const { payload } = action;
      const res = yield call(httpCinemas.getCinemaDetails, payload);
      const { status, data } = res
      if (status === "ok") {
        yield put({ type: CinemaType.LOADING_HIDE });
        yield put({ type: CinemaType.CINEMA_DETAIL_SUCCESS, payload: data });
      }
  
    } catch (error) { throw error; }
}

function* getListCinemas() {
    yield takeEvery(CinemaType.LIST_CINEMAS, fetchListCinemas);
}

function* getCinemaDetails() {
    yield takeEvery(CinemaType.CINEMA_DETAIL, fetchCinemaDetails);
}
export default function* CinemasSaga() {
    yield all([
        getListCinemas(),
        getCinemaDetails()
    ]);
  }