import {
  ACTION_SHOW_LOADING,
  ACTION_HIDE_LOADING
} from "../actions/loading.action";

const loadingState = {
  loading: false
};

export const loadingReducer = (state = loadingState, action) => {
  switch (action.type) {
    case ACTION_SHOW_LOADING:
      return Object.assign({}, state, { loading: true });
    case ACTION_HIDE_LOADING:
      return Object.assign({}, state, { loading: false });
    default:
      return state;
  }
};
