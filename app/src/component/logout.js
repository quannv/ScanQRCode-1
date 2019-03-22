import React, { Component } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { lang } from "../language/index";
import Icon5 from 'react-native-vector-icons/FontAwesome5Pro';
import AsyncstorageHelper from '../helpers/asyncstorage.helper'
import { connect } from "react-redux";
import { sizeHeight, sizeFont, sizeWidth } from "../helpers/size.helper";
import { USER_STATUS, setUserStatus } from '../actions/userStatus.action'
class Logout extends Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.view_item}
                onPress={() => {
                    Alert.alert(
                        lang('logout.label_logout'),
                        lang('logout.label_logout'),
                        [
                            { text: lang('logout.NO'), onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                            {
                                text: lang('logout.YES'), onPress: async () => {
                                    await AsyncstorageHelper._removeData('userData');
                                    await AsyncstorageHelper._removeData('token');
                                    await this.props.setUserStatus(USER_STATUS.LOADING_STATUS)
                                    console.log(this.props);
                                }
                            },
                        ],
                        { cancelable: false }
                    )

                }}
            >
                <View style={styles.view_icon}>
                    <Icon5 light name='sign-out-alt' size={sizeFont(6)} />
                </View>
                <View style={styles.view_text}>
                    <Text style={styles.text}>{lang('logout.label_logout')}</Text>
                </View>

            </TouchableOpacity>

        )
    }

}
const styles = StyleSheet.create({
    view_item: {
        marginLeft:  sizeWidth(3),
        marginBottom: 1,
        height: sizeHeight(7),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    view_icon: {
        width: sizeWidth(11),
        justifyContent: 'center',
    },
    view_text: {
        justifyContent: 'center',
        flex: 1
    },
    text: {
        fontSize: sizeFont(4),
        fontWeight: 'bold',
    }
})
const mapsStateToProps = (state) => {
    return {
        userStatus: state.userStatus.userStatus
    }
}
const mapsDispatchToProps = (dispatch) => {
    return {
        setUserStatus: (status) => dispatch(setUserStatus(status))
    }
}
export default connect(mapsStateToProps, mapsDispatchToProps)(Logout);
