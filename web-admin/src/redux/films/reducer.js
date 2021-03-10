import films from '../../api/films';
import FilmTypes from './types';
// import update from 'immutability-helper';
import findIndex from 'lodash/findIndex'

const initialState = {
  status: true,
  filmsNow: [],
  filmsFuture: [],
  filmsToday: [],
  theaters: [],
  filmDetail: {},
  seats: [],
  dayOfWeeks:[],
  categories:[],
  newfilm:[],
  filmSchedule:[],
  listNews: [],
  updatefilmSchedule:[],
  newfilmSchedule:[],
  newDetail: {},
  theaterDetail: {},
  roomDetail: {},
  tickets:[],
  loading: 0,
  theaterChart: {},
  statistic:[],
  loading: 0
}

export default function filmsReducer(state = initialState, action) {
  let newState;

  const { type, payload = {} } = action;
  switch (type) {
    case FilmTypes.FILM_DETAIL_SUCCESS:
      newState = Object.assign({}, state, { filmDetail: payload.detail,dayOfWeeks:payload.dayOfWeeks})
      break;
    case FilmTypes.LIST_FILM_NOW_SUCCESS:
      newState = Object.assign({}, state, { filmsNow: payload })
      break;
    case FilmTypes.LIST_FILM_FUTURE_SUCCESS:
      newState = Object.assign({}, state, { filmsFuture: payload })
      break;
    case FilmTypes.LIST_FILM_TODAY_SUCCESS:
      newState = Object.assign({}, state, { filmsToday: payload })
      break;
      case FilmTypes.LIST_TICKET_SUCCESS:
        newState = Object.assign({}, state, { tickets: payload })
    case FilmTypes.LIST_TICKET_SUCCESS:
      newState = Object.assign({}, state, { tickets: payload })
      break;
      case FilmTypes.STATISTIC_SUCCESS:
        newState = Object.assign({}, state, { statistic: payload })
        break;
    case FilmTypes.LIST_SEATS_SUCCESS:
      newState = Object.assign({}, state, { seats: payload.seats })
      break;
    case FilmTypes.UPDATE_FILM_DETAIL_SUCCESS:
      newState = Object.assign({},state,{filmsNow : state.filmsNow.map(item=>
        item._id==payload._id?payload:item)})
      break;
    case FilmTypes.LIST_CATEGOGY_SUCCESS:
      newState = Object.assign({},state,{categories : payload})
      break;
    case FilmTypes.ADD_NEW_FILM_SUCCESS:
      newState = Object.assign({},state,{filmsNow : [payload, ...state.filmsNow]})
      break;
    case FilmTypes.FILM_SCHEDULE_SUCCESS:
      newState = Object.assign({},state,{filmSchedule :[...payload,state.filmSchedule]})
      break;
    case FilmTypes.UPDATE_FILM_SCHEDULE_SUCCESS:
      newState = Object.assign({},state,{filmSchedule : state.filmSchedule.map(item=>{ return item._id === payload._id ? item = payload : item})})
      break;
    case FilmTypes.DELETE_FILM_SCHEDULE_SUCCESS:
      newState = Object.assign({},state,{filmSchedule : state.filmSchedule.filter((item,key)=>{ return  item._id == payload._id ? null : item})})
      break;
    case FilmTypes.CREATE_FILM_SCHEDULE_SUCCESS:
      newState = Object.assign({},state,{filmSchedule :[...payload,state.filmSchedule]})
      break;
    case FilmTypes.LIST_THEATER_SUCCESS:
      newState = Object.assign({},state,{theaters : payload})
      break;
    case FilmTypes.CREATE_NEW_SUCCESS:
      newState = Object.assign({},state,{ listNews: [payload, ...state.listNews]})
      break;
    case FilmTypes.LIST_NEW_SUCCESS:
      newState = Object.assign({},state,{ listNews: [...payload] })
      break;
    case FilmTypes.NEW_DETAIL_SUCCESS:
      newState = Object.assign({},state,{ newDetail: {...payload} })
      break;
    case FilmTypes.UPDATE_NEW_SUCCESS:
      let index = findIndex(state.listNews, item => item._id === payload._id)
      let arr = [...state.listNews]
      arr[index] = payload
      newState = Object.assign({},state,{ listNews: [...arr], newDetail: {...payload} })
      break;
    case FilmTypes.THEATER_DETAIL_SUCCESS:
      newState = Object.assign({}, state, { theaterDetail: {...payload} })
      break;
    case FilmTypes.THEATER_UPDATE_SUCCESS:
      let indenT = findIndex(state.theaters, item => item._id === payload._id)
      let arrT = [...state.theaters]
      arrT[indenT] = payload
      newState = Object.assign({}, state, { theaters: [...arrT], theaterDetail: {...payload}})
      break;
    case FilmTypes.ROOM_DETAIL_SUCCESS:
      newState = Object.assign({}, state, { roomDetail: {...payload} })
      break;
    case FilmTypes.ROOM_UPDATE_SUCCESS:
      newState = Object.assign({}, state, { roomDetail: {...payload} })
      break;
    case FilmTypes.CREATE_THEATER_SUCCESS:
      newState = Object.assign({}, state, { theaters: [...state.theaters, payload] })
      break;
    case FilmTypes.ROOM_CREATE_SUCCESS:
      newState = Object.assign({}, state, { roomDetail: {...payload} })
      break;
    case FilmTypes.DELETE_THEATER_SUCCESS:
      let indenA = findIndex(state.theaters, item => item._id === payload._id)
      let arrA = [...state.theaters]
      if (indenA > -1) {
        arrA.splice(indenA, 1);
      }
      newState = Object.assign({}, state, { theaters: [...arrA] })
      break;
    case FilmTypes.DELETE_ROOM_SUCCESS:
      let indenQ = findIndex(state.theaterDetail.rooms, item => item._id === payload._id)
      let arrQ = [...state.theaterDetail.rooms]
      if (indenQ > -1) {
        arrQ.splice(indenQ, 1);
      }
      newState = Object.assign({}, state, { theaterDetail: {...state.theaterDetail, rooms: arrQ } })
      break;
      case FilmTypes.LOADING_SHOW:
        let newLoading1 = state.loading + 1
        newState = Object.assign({}, state, { loading: newLoading1 < 0 ? 0 : newLoading1 });
        break;
      case FilmTypes.LOADING_HIDE:
        let newLoading2 = state.loading - 1
        newState = Object.assign({}, state, { loading: newLoading2 < 0 ? 0 : newLoading2  });
        break;
      case FilmTypes.THEATER_CHART_SUCCESS:
        newState = Object.assign({}, state, { theaterChart: payload })
        break;
    default:
      newState = state;
  }
  return newState
}
