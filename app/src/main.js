import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import AppNavigator from "./navigators/app.navigator";
import { setTopLevelNavigator } from "./actions/nav.action";
import LoadingView from "./component/loading";
import AsyncStorageHelper from './helpers/asyncstorage.helper'
import Chooselanguage from './screen/chooselanguage.screen'
import { connect } from 'react-redux'
import { changeLanguage } from './actions/language.action'
import I18n from './language'
import { PRIMARY_COLOR } from './config/app.config'
import LoginScreen from './screen/login.screen'
import { check_token } from './api/api'
import { USER_STATUS, setUserStatus } from './actions/userStatus.action'
import { showLoading, hideLoading } from './actions/loading.action'
export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }
  async componentWillMount() {
    //AsyncStorageHelper._removeData('language');
    this.props.showLoading();
    let userData = await AsyncStorageHelper._retrieveData('userData').then(val => {
      console.log(JSON.parse(val));
    }
    );
    await AsyncStorageHelper._retrieveData('token').then(async token => {
      if (token !== null) {
        let res = await check_token(token);
        if (res.code == 1) {
          AsyncStorageHelper._storeData('userData', JSON.stringify(res.user));
          await this.props.setUserStatus(USER_STATUS.AUTHORIZED);
        }
        else if (res.code == 0) {
          AsyncStorageHelper._removeData('token');
          AsyncStorageHelper._removeData('userData');
        }
      }
    })

    await AsyncStorageHelper._retrieveData('language').then(value => {
      if (value !== null) {
        this.props.changeLanguage(value);
      }
      this.setState({ isLoading: false })
    })
    this.props.hideLoading();

  }
  render() {
    console.log(this.props);
    let language = this.props.language;
    I18n.locale = language;
    
    return (
      <View style={styles.container}>
        {
          this.state.isLoading ?
            <View style={{ marginTop: 20 }}>
              <ActivityIndicator size='large' color={PRIMARY_COLOR} />
            </View>
            :
            this.props.userStatus === 'LOADING_STATUS' ?
              <LoginScreen />
              :
              language === null ?
                <Chooselanguage />
                :
                <AppNavigator />
        }
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

const mapStateToProps = (state) => {
  return {
    language: state.language.language,
    userStatus: state.userStatus.userStatus,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (lang) => dispatch(changeLanguage(lang)),
    setUserStatus: (status) => dispatch(setUserStatus(status)),
    showLoading: () => dispatch(showLoading()),
    hideLoading: () => dispatch(hideLoading())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main) 
