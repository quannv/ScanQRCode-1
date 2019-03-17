import React, {Component} from 'react'
import { 
    View, StyleSheet, Text, TouchableOpacity
} from 'react-native'
import AsyncStorageHelper from '../helpers/asyncstorage.helper'
import {PRIMARY_COLOR} from '../config/app.config'
import {connect} from 'react-redux'
import {changeLanguage} from '../actions/language.action'
export class ChooseLanguage extends Component {
    constructor(props) {
        super(props)
    }
    render () {
        console.log(this.props)
        return (
            <View style={[{backgroundColor:'white', flex:1}, styles.view]}>
                <Text style={styles.text}>Choose Language</Text>
                <TouchableOpacity style={styles.bnt}
                    onPress = {  ()=> {
                        AsyncStorageHelper._storeData('language', 'en');
                        this.props.changeLanguage('en');
                    }}
                >
                    <Text style={styles.bnt_text}>english</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bnt}
                    onPress={async ()=>{
                        AsyncStorageHelper._storeData('language', 'fr');
                        this.props.changeLanguage('fr');
                    }}
                >
                    <Text style={styles.bnt_text}>français</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    view : {
        alignItems : 'center',
        justifyContent: 'center',
    },
    text : {
        color : `${PRIMARY_COLOR}`,
        fontSize : 18,
        marginBottom : 50,
    },
    bnt : {
        flexDirection: 'row',
        marginBottom : 15,
        marginRight: 20,
        marginLeft: 20,
        backgroundColor: `${PRIMARY_COLOR}`,
    },
    bnt_text : {
        flex: 1,
        flexDirection: 'column',
        color : 'white',
        fontSize: 15,
        padding: 12,
    }

})

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguage : (lang) => {dispatch(changeLanguage(lang))}
    }
}
export default connect(null, mapDispatchToProps)(ChooseLanguage)