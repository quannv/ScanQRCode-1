import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { loadingReducer } from "../reducers/loading.reducer";
// import rootSaga from "../sagas/root.saga";

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(loggerMiddleware, sagaMiddleware)
);

const configureStore = (preloadedState = {}) => {
  const appReducers = combineReducers({
    loadingState: loadingReducer
  });
  const store = createStore(appReducers, preloadedState, enhancer);

  //   sagaMiddleware.run(rootSaga);

  return { store };
};

export default configureStore;
