import NewsTypes from "./types";

export function getListNews() {
    return {
      type: NewsTypes.LIST_NEWS,
    };
}

export function getNewsDetails(id) {
    return {
      type: NewsTypes.NEWS_DETAIL,
      payload: id,
    };
}