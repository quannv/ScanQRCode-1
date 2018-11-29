import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { AppNavigator } from "./navigators/app.navigator";
import { setTopLevelNavigator } from "./actions/nav.action";
import LoadingView from "./component/loading";

export default class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AppNavigator
          ref={navigatorRef => {
            setTopLevelNavigator(navigatorRef);
          }}
        />
        <LoadingView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
