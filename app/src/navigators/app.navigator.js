import React from 'react'
import { createDrawerNavigator} from 'react-navigation'
import LoginStack from './loginStack'
import MainStack from './mainStack'
import ProfileStack from './profileStack'
import Icon from 'react-native-vector-icons/FontAwesome'
import {sizeFont, sizeHeight, sizeWidth} from '../helpers/size.helper'
import {PRIMARY_COLOR} from '../config/app.config'
const AppDrawer = createDrawerNavigator({
  Home : {
    screen : MainStack,
    navigationOptions: {
      title : 'Home',
      drawerIcon: ({ focused, tintColor }) => (
        <Icon 
          name ='home'
          resizeMode="contain"
          size = {sizeFont(6)}
          color = {focused ? PRIMARY_COLOR : 'gray'}
        />
      )
    }
  },
  Profile : {
    screen : ProfileStack,
    navigationOptions: {
      title : 'Profile',
      drawerIcon: ({ focused, tintColor }) => (
        <Icon 
          name ='bus'
          resizeMode="contain"
          size = {sizeFont(6)}
          color = {focused ? PRIMARY_COLOR : 'gray'}
        />
      )
    }
  },
  Login : {
    screen : LoginStack,
    navigationOptions: {
      title : 'Logout',
      drawerIcon: ({ focused, tintColor }) => (
        <Icon 
          name ='power-off'
          resizeMode="contain"
          size = {sizeFont(6)}
          color = {focused ? PRIMARY_COLOR : 'gray'}
        />
      )
    }
  },
},
{
  initialRouteName: "Home",
  contentOptions: {
    inactiveTintColor: 'gray',
    activeTintColor: PRIMARY_COLOR
  },
  style : {
    marginTop : sizeHeight(5)
  }
}
)

export default AppDrawer;