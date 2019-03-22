import React, { Component } from 'react'
import {
    View, Text, StyleSheet, FlatList
} from 'react-native'
import { sizeFont, sizeHeight, sizeWidth } from '../helpers/size.helper'
import Logout from '../component/logout'
import HeaderNav from '../component/headerNav'
import Icon from 'react-native-vector-icons/FontAwesome5Pro'
import { PRIMARY_COLOR } from '../config/app.config'
import OneLine from '../component/oneline'

class ItemMenu extends Component {
    render() {
        const { icon, screen, title } = this.props.item;
        return (
            <View>
                <View style={styles.container_item}>
                    <View style={{ flexDirection: 'row', flex: 5 }}>
                        <Icon name={icon} size={sizeFont(6)} color={PRIMARY_COLOR}></Icon>
                        <Text style={styles.item_title}>{title}</Text>
                    </View>
                    <View style={{ flex: 5, alignItems: 'flex-end', marginRight: sizeWidth(3) }}>
                        <Icon name={'chevron-right'} size={sizeFont(6)} color={PRIMARY_COLOR}></Icon>
                    </View>
                </View>
                <OneLine color={PRIMARY_COLOR} />
            </View>
        )
    }
}

export default class Profile extends Component {
    render() {
        const menu = [
            {
                title: 'List Customer',
                icon: 'list-alt',
                screen : ''
            }
        ]
        return (
            <View style={styles.container}>
                <HeaderNav iconLeft='bars'
                    actionLeft={() => { this.props.navigation.openDrawer() }} />
                <View style={styles.container_menu_view}>
                    <FlatList
                        data={menu}
                        renderItem={({ item }) => (<ItemMenu item={item} />)}
                        keyExtractor={(item, index) => index}
                    >

                    </FlatList>
                </View>
                <Logout />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    container_menu_view: {
        marginLeft: sizeWidth(5)
    },



    //item
    container_item: {
        height: sizeHeight(7),
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    item_title: {
        flex: 1,
        marginLeft: sizeWidth(3),
        fontSize: sizeFont(4),
    },
    icon_end: {
        flex: 4,
        alignItems: 'flex-end',
        marginRight: sizeWidth(3),
        backgroundColor: 'blue'

    }
})