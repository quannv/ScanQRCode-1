import React, { Component } from 'react'
import {
    View, Text, StyleSheet, TouchableOpacity
} from 'react-native'
import  RNAccountKit from "react-native-facebook-account-kit";
// import { PRIMARY_COLOR } from '../config/app.config'
// import { sizeFont, sizeHeight, sizeWidth } from './helpers/size.helper'
import Icon from 'react-native-vector-icons/FontAwesome5Pro'

export default class LoginScreen extends Component {
    componentWillMount() {
    }

    render() {
        try {
           
        } catch (error) {
            console.log(error)
        }
        return (
            <View >
                <View >
                    <Text >TBUSDriver App</Text>
                </View>
                <View >
                    <TouchableOpacity 
                        onPress={ () => {
                            console.log('---------test---------');
                            //this.loginWithPhone();
                            RNAccountKit.loginWithPhone()
                                .then(res=>{
                                    console.log(res)
                                })
                        }}
                    >
                        <Icon name='mobile-alt' color={"green"} size={5}></Icon>
                        <Text >Login to continue</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('Camera');
                    }}>
                        <Text>
                            Camera
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: `${PRIMARY_COLOR}`,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     title: {
//         alignItems: 'center',
//         marginBottom: sizeHeight(7),
//     },
//     TBUS_text: {
//         color: 'white',
//         fontSize: sizeFont(6)
//     },
//     greeting_text: {
//         color: 'white',
//         fontSize: sizeFont(4)
//     },
//     button: {
//         backgroundColor: 'white',
//         padding: sizeHeight(2),
//         borderRadius: 3,
//         flexDirection: 'row',
//     },
//     text_login: {
//         fontSize: sizeFont(4),
//         marginLeft: sizeWidth(5),
//     }
// })