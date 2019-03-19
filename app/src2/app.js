import React, {Component} from 'react'
import {createAppContainer, createStackNavigator} from 'react-navigation'
import Home from './index'
import Camera from './camera'

export default createStackNavigator({
    Home : {
        screen : Home
    },
    Camera : {
        screen : Camera
    }
})