import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import  AppNavigator from "./navigators/app.navigator";
import { setTopLevelNavigator } from "./actions/nav.action";
import LoadingView from "./component/loading";
import AsyncStorageHelper from './helpers/asyncstorage.helper'
import Chooselanguage from './screen/chooselanguage.screen'
import { connect } from 'react-redux'
import { changeLanguage } from './actions/language.action'
import I18n from './language'
import {PRIMARY_COLOR} from './config/app.config'
export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
  async componentWillMount() {
    //AsyncStorageHelper._removeData('language');
    let lang = await AsyncStorageHelper._retrieveData('language').then(val=>val);
    console.log(lang);
    console.log('test AsyncStorageHelper as ----------');
    AsyncStorageHelper._retrieveData('language').then(value => {
      if(value !== null) {
        this.props.changeLanguage(value);
      }
      this.setState({isLoading : false})
     })
  }
  render() {
    console.log(this.props);
    let language = this.props.language;
    I18n.locale = language;
    return (
      <View style={styles.container}>
        {
          this.state.isLoading ?
            <View style={{marginTop:20}}>
                <ActivityIndicator size='large' color={PRIMARY_COLOR}/>
            </View>
            :
            language === null ?
              <Chooselanguage />
              :
              <AppNavigator/>
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
    language: state.language.language
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (lang) => dispatch(changeLanguage(lang))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main) 
