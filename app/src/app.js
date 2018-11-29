import * as React from "react";
import { Provider } from "react-redux";
import configureStore from "./store/configure-store";
import Main from "../src/main";

const prefix = `com.scanqrcode://`;

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main uriPrefix={prefix} />
      </Provider>
    );
  }
}

export default App;

export const { store } = configureStore();
