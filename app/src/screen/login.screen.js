import React, { Component } from 'react'
import {
    View, Text, StyleSheet, TouchableOpacity
} from 'react-native'
import RNAccountKit from "react-native-facebook-account-kit";
import { PRIMARY_COLOR } from '../config/app.config'
import AsyncstorageHelper from '../helpers/asyncstorage.helper'
import { sizeFont, sizeHeight, sizeWidth } from '../helpers/size.helper'
import Icon from 'react-native-vector-icons/FontAwesome5Pro'
import { check_token_account_kit } from '../api/api'

export default class LoginScreen extends Component {
    componentWillMount() {
        RNAccountKit.configure({
            viewControllerMode: 'show',
            responseType: 'code', // 'token' by default,
            titleType: 'login',
            initialPhoneCountryPrefix: '+33', // autodetected if none is provided
            defaultCountry: 'FR'
        })
    }
    render() {
        try {

        } catch (error) {
            console.log(error)
        }
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.TBUS_text}>TBUSDriver App</Text>
                </View>
                <View style={styles.button_container}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            RNAccountKit.loginWithPhone().then(async (token) => {
                                if (!token) {
                                    alert('Error');
                                    return;
                                }
                                else {
                                    let phone = await check_token_account_kit(token.token);
                                    if (phone === null) {
                                        alert('Error');
                                        return;
                                    }
                                    if (phone !== null) {
                                        console.log(phone);
                                        console.log('this is phone number');
                                    }
                                }
                            });
                        }}
                    >
                        <Icon name='mobile-alt' color={PRIMARY_COLOR} size={sizeFont(5)}></Icon>
                        <Text style={styles.text_login}>Login to continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: `${PRIMARY_COLOR}`,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        alignItems: 'center',
        marginBottom: sizeHeight(7),
    },
    TBUS_text: {
        color: 'white',
        fontSize: sizeFont(6)
    },
    greeting_text: {
        color: 'white',
        fontSize: sizeFont(4)
    },
    button: {
        backgroundColor: 'white',
        padding: sizeHeight(2),
        borderRadius: 3,
        flexDirection: 'row',
    },
    text_login: {
        fontSize: sizeFont(4),
        marginLeft: sizeWidth(5),
    }
})