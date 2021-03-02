import NewsTypes from "./types";

const initialState = {
    status: true,
    loading: true,
    newsList: [],
    newsDetails: {},
}

export default function newsReducer(state = initialState, action) {
    let newState;
  
    const { type, payload = {} } = action;
    switch (type) {
      case NewsTypes.LIST_NEWS_SUCCESS:
        newState = Object.assign({}, state, { newsList: payload})
        break;
      case NewsTypes.NEWS_DETAIL_SUCCESS:
        newState = Object.assign({}, state, { newsDetails: payload})
        break;
      case NewsTypes.LOADING_SHOW:
        newState = Object.assign({}, state, { loading: true });
        break;
      case NewsTypes.LOADING_HIDE:
        newState = Object.assign({}, state, { loading: false });
        break;
      default:
        newState = state;
    }
    return newState
}