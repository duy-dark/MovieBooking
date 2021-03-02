import { all, takeEvery, put, call } from "redux-saga/effects";
import NewTypes from "./types";
import httpNews from "../../api/news";
 
function* fetchListNews() {
    try {
      yield put({ type: NewTypes.LOADING_SHOW });
      const res = yield call(httpNews.getListNews, {});
      const { status, data } = res
      if (status === "ok") {
        yield put({ type: NewTypes.LOADING_HIDE });
        yield put({ type: NewTypes.LIST_NEWS_SUCCESS, payload: data });
      }
  
    } catch (error) { console.log(error); }
}

function* fetchNewsDetails(action) {
    try {
      yield put({ type: NewTypes.LOADING_SHOW });
      const { payload } = action;
      const res = yield call(httpNews.getNewsDetails, payload);
      const { status, data } = res
      if (status === "ok") {
        yield put({ type: NewTypes.LOADING_HIDE });
        yield put({ type: NewTypes.NEWS_DETAIL_SUCCESS, payload: data });
      }
  
    } catch (error) { console.log(error); }
}

function* getListNews() {
    yield takeEvery(NewTypes.LIST_NEWS, fetchListNews);
}

function* getNewsDetails() {
    yield takeEvery(NewTypes.NEWS_DETAIL, fetchNewsDetails);
}
export default function* NewsSaga() {
    yield all([
        getListNews(),
        getNewsDetails()
    ]);
  }