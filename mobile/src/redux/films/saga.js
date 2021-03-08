import { all, takeEvery, put, call } from "redux-saga/effects";
import FilmsType from "./types";
import httpFilms from "../../api/films";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'


const storeData = async (storage, value) => {
  try {
    await AsyncStorage.setItem(storage, value)
  } catch (e) {
    // saving error
  }
}

const removeData = async (storage) => {
  try {
      await AsyncStorage.removeItem(storage);
      return true;
  }
  catch(exception) {
      return false;
  }
}

async function getDataUrl(navigation) {
  // alert(url)
  try {
    const dispatch = useDispatch()
    const url = await AsyncStorage.getItem("url")
    if(url) {
      dispatch(getTicketDetail(url, navigation))
    }
  } catch(e) {
    // error reading value
  }
}

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

  } catch (error) { throw error; }
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

  } catch (error) { throw error; }
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

  } catch (error) { throw error; }
}

function* fetchListFilmsToday() {
  try {
    const res = yield call(httpFilms.getListFilmToday, {});
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LIST_FILM_TODAY_SUCCESS, payload: data });
    }

  } catch (error) { throw error; }
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

  } catch (error) { throw error; }
}

function* fetchSearch() {
  try {
    const res = yield call(httpFilms.search, {});
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.SEARCH_SUCCESS, payload: data });
    }

  } catch (error) { throw error; }
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
  } catch (error) { throw error; }
}

function* fetchCreateComment(action) {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const { payload, navigation } = action
    const res = yield call(httpFilms.createComment, payload);
    const { status, data } = res
    if (status === "ok") {
      navigation.goBack()
      yield put({ type: FilmsType.LOADING_HIDE });
      yield put({ type: FilmsType.CREATE_COMMENT_SUCCESS, payload: data.comment });
    }

  } catch (error) { throw error; }
}

function* fetchGetTickets(action) {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const { payload } = action
    const res = yield call(httpFilms.getTickets, payload)
    const { status, data } = res
    if (status === "ok") {
      yield put({type: FilmsType.LOADING_HIDE})
      yield put({type: FilmsType.GET_TICKETS_SUCCESS, payload: data})
    }
  }
  catch (error) { throw error;}
}

function* fetchListFilmsNowFavorite(action) {
  try {
    const { payload } = action
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.getListFilmNowFavorite, payload);
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LOADING_HIDE });
      yield put({ type: FilmsType.LIST_FILM_NOW_FAVORITE_SUCCESS, payload: data });
    }

  } catch (error) { throw error; }
}

function* fetchListFilmsFutureFavorite(action) {
  try {
    const { payload } = action
    yield put({ type: FilmsType.LOADING_SHOW });
    const res = yield call(httpFilms.getListFilmFutureFavorite, payload);
    const { status, data } = res
    if (status === "ok") {
      yield put({ type: FilmsType.LOADING_HIDE });
      yield put({ type: FilmsType.LIST_FILM_FUTURE_FAVORITE_SUCCESS, payload: data });
    }

  } catch (error) { throw error; }
}

function* fetchPaymentGate(action) {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const { payload, Linking, navigation } = action
    const res = yield call(httpFilms.paymentMomo, payload);
    yield put({ type: FilmsType.LOADING_HIDE });
    const { data, status } = res
    // storeData("url",data.url2)
    // getDataUrl(navigation)
    if (status === "ok") {
      Linking.openURL(data.url1)
      navigation.navigate("Screen", {
        url: data.url2
      })
    } else {
      const { error_message: {  error_code, detail } = {}} = data
      if (error_code === 204 ) {
        alert(detail)
      }
    }
  } catch (error) { throw error; }
}

function* fetchGetTicketDetail(action) {
  try {
    yield put({ type: FilmsType.LOADING_SHOW });
    const { payload } = action
    // alert(payload)
    const res = yield call(httpFilms.getTicketDetail, payload);
    const { status, data } = res
    if (status === "ok") {
      // removeData("url")
      yield put({ type: FilmsType.LOADING_HIDE });
      yield put({ type: FilmsType.GET_TICKETDETAIL_SUCCESS, payload: data });
    }
  } catch (error) { throw error; }
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

function* getTickets() {
  yield takeEvery(FilmsType.GET_TICKETS, fetchGetTickets);
}

function* getFilmsNowFavorite() {
  yield takeEvery(FilmsType.LIST_FILM_NOW_FAVORITE, fetchListFilmsNowFavorite);
}

function* getFilmsFutureFavorite() {
  yield takeEvery(FilmsType.LIST_FILM_FUTURE_FAVORITE, fetchListFilmsFutureFavorite);
}

function* paymentGateway() {
  yield takeEvery(FilmsType.PAYMENT_MOMO, fetchPaymentGate);
}

function* getTicketDetail() {
  yield takeEvery(FilmsType.GET_TICKETDETAIL, fetchGetTicketDetail)
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
    createComment(),
    getTickets(),
    getFilmsFutureFavorite(),
    paymentGateway(),
    getTicketDetail(),
    getFilmsNowFavorite()
  ]);
}
