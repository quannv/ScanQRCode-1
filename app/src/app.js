import * as React from "react";
import { Provider } from "react-redux";
import configureStore from "./store/configure-store";
import Main from "../src/main";


class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main/>
      </Provider>
    );
  }
}
console.disableYellowBox = true;
export default App;

export const { store } = configureStore();
