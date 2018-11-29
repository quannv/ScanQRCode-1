import { NavigationActions, StackActions } from "react-navigation";

let _navigator;

export function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

export const navigateToPage = (pageName, data) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName: pageName,
      params: data
    })
  );
};

export const toggleDrawer = () => {
  _navigator.dispatch(
    NavigationActions.navigate({ routeName: "DrawerToggle" })
  );
};

export const goBack = () => {
  _navigator.dispatch(NavigationActions.back({}));
};

export const resetPage = (page, data) => {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: page, params: data })]
    })
  );
};

export const resetPageOnTop = (page, params, beforePage = "Main") => {
  _navigator.dispatch(
    StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: beforePage }),
        NavigationActions.navigate({ routeName: page, params })
      ]
    })
  );
};
