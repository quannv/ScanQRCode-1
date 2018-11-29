export const ACTION_SHOW_LOADING = "ACTION_SHOW_LOADING";
export const ACTION_HIDE_LOADING = "ACTION_HIDE_LOADING";

export const showLoading = () => {
  return { type: ACTION_SHOW_LOADING };
};

export const hideLoading = () => {
  return { type: ACTION_HIDE_LOADING };
};
