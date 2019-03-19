/** @format */

import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
// import App from "./app/src/app.js";
import App from "./app/src/app"; 

AppRegistry.registerComponent(appName, () => App);
