import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from './modules/reducers/';
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./modules/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = compose(
  applyMiddleware(sagaMiddleware),
  window.devToolsExtension && window.devToolsExtension()
)(createStore)(rootReducer);

sagaMiddleware.run(rootSaga);

export default store;
