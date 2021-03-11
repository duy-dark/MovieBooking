import { all, takeEvery, put, call } from "redux-saga/effects";
import FilmsType from "./types";
import httpFilms from "../../api/films";

function* fetchGetTicketDetail(action) {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const { payload } = action
    // alert(payload)
    const res = yield call(httpFilms.getTicketDetail, payload)
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LOADING_HIDE });
      yield put({ type: FilmsType.GET_TICKETDETAIL_SUCCESS, payload: data });
    }
  } catch (error) { console.log(error); }
}

function* fetchGetCouponDetail(action) {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const { payload } = action
    // alert(payload)
    const res = yield call(httpFilms.getCouponDetail, payload)
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LOADING_HIDE });
      yield put({ type: FilmsType.GET_COUPON_SUCCESS, payload: data });
    }
  } catch (error) { console.log(error); }
}


function* getTicketDetail() {
  yield takeEvery(FilmsType.GET_TICKETDETAIL, fetchGetTicketDetail)
}

function* getCouponDetail() {
  yield takeEvery(FilmsType.GET_COUPON, fetchGetCouponDetail)
}

export default function* filmsSaga() {
  yield all([
    getTicketDetail(),
    getCouponDetail()
  ]);
}
