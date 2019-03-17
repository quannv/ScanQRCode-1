import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { loadingReducer } from "../reducers/loading.reducer";
import {languageReducer} from "../reducers/language.reducer"
import thunk from 'redux-thunk'
// import rootSaga from "../sagas/root.saga";

// const loggerMiddleware = createLogger();
// const sagaMiddleware = createSagaMiddleware();

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const enhancer = composeEnhancers(
//   applyMiddleware(loggerMiddleware, sagaMiddleware)
// );

const configureStore = (preloadedState = {}) => {
  const appReducers = combineReducers({
    loadingState: loadingReducer,
    language : languageReducer
  });
  //const store = createStore(appReducers, preloadedState, enhancer);
  const store = createStore(appReducers, applyMiddleware(thunk));

  //   sagaMiddleware.run(rootSaga);

  return { store };
};

export default configureStore;
