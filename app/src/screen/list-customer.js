import React, { Component } from 'react'
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView
} from 'react-native'
import { sizeFont, sizeHeight, sizeWidth } from '../helpers/size.helper'
import Icon from 'react-native-vector-icons/FontAwesome5Pro'
import { PRIMARY_COLOR } from '../config/app.config'
import HeaderNav from '../component/headerNav'
import OneLine from '../component/oneline'
import { get_order_customer } from '../api/api'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from '../actions/loading.action'

class Item extends Component {
    render() {
        const { item } = this.props;
        return (
            <View style={styles.item_container}>
                <View style={styles.item_name}>
                    <View style={styles.icon_view}>
                        {
                            item.checkin == '0' ? <Icon name='user' color={PRIMARY_COLOR} size={sizeFont(4)}></Icon> :
                            <Icon name='user-check' color={PRIMARY_COLOR} size={sizeFont(4)}></Icon>
                        }
                    </View>
                    <Text style={styles.item_label}>Name : </Text>
                    <Text style={styles.item_content}>{item.name_customer}</Text>
                </View>
                <View style={styles.item_contact}>
                    <Text style={styles.icon_view}><Icon name='mobile' color={PRIMARY_COLOR} size={sizeFont(4)}></Icon></Text>
                    <Text style={styles.item_label}>Contact : </Text>
                    <Text style={styles.item_content}>{item.contact_customer}</Text>
                </View>
                <View style={styles.item_seats}>
                    <Text style={styles.icon_view}><Icon name='ticket-alt' color={PRIMARY_COLOR} size={sizeFont(4)}></Icon></Text>
                    <Text style={styles.item_label}>Person(s) : </Text>
                    <Text style={styles.item_content}>{item.seat} / {item.pay_status == 'PENDING' ? 'Not Paid' : 'Paid'}</Text>
                </View>
                {/* <View style={styles.item_checkin}>
                    <Text style={styles.icon_view}><Icon name='money-bill' color={PRIMARY_COLOR} size={sizeFont(4)}></Icon></Text>
                    <Text style={styles.item_label}>Pay : </Text>
                    <Text style={styles.item_content}>{item.total}</Text>
                </View> */}
                {/* <View style={styles.item_checkin}>
                    <Text style={styles.icon_view}><Icon name='user-check' color={PRIMARY_COLOR} size={sizeFont(4)}></Icon></Text>
                    <Text style={styles.item_label}>Checkin : </Text>
                    <Text style={styles.item_content}>{item.checkin == '1' ? 'Yes' : 'No'}</Text>
                </View> */}
                <View style={styles.item_oneline}>
                    <OneLine color={PRIMARY_COLOR} />
                </View>
            </View>
        )
    }
}
class ListCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowList: true,
            list: [],
            bus_info: ''
        }
    }
    async componentWillMount() {
        this.props.show_loading();
        let _params = this.props.navigation.getParam('item');
        let res = await get_order_customer(_params.bustrip_id, _params.date);
        if (res.status == 1) {
            let total_pay = 0;
            if (res.data != null) {
                res.data.map(item => {
                    total_pay += parseInt(item.total);
                })
            }
            await this.setState({
                bus_info: {
                    bus_id: _params.bustrip_id,
                    date: _params.date,
                    code: _params.info_bustrip.code,
                    total_seats: _params.seat_total,
                    total_pay: total_pay
                },
                list: res.data,
            });
            this.props.hide_loading();

        }
    }

    async _refresh () {
        this.props.show_loading();
        let _params = this.props.navigation.getParam('item');
        let res = await get_order_customer(_params.bustrip_id, _params.date);
        if (res.status == 1) {
            let total_pay = 0;
            if (res.data != null) {
                res.data.map(item => {
                    total_pay += parseInt(item.total);
                })
            }
            await this.setState({
                bus_info: {
                    bus_id: _params.bustrip_id,
                    date: _params.date,
                    code: _params.info_bustrip.code,
                    total_seats: _params.seat_total,
                    total_pay: total_pay
                },
                list: res.data,
            });
            this.props.hide_loading();

        }
    }
    render() {

        return (
            <View style={styles.container}>
                <HeaderNav
                    iconLeft='arrow-left' actionLeft={() => this.props.navigation.goBack()}
                    title='List Customers' 
                    iconRight='redo-alt' actionRight={() => this._refresh()}/>
                <View style={styles.info_bus}>
                    <View style={styles.line}>
                        <View style={styles.icon_view}><Icon name='bus' color={PRIMARY_COLOR} size={sizeFont(5)}></Icon></View>
                        {/* <Text style={styles.item_label}>Bus Code : </Text> */}
                        <Text style={styles.item_content}>{this.state.bus_info.code} - {this.state.bus_info.total_seats}</Text>
                    </View>
                    {/* <View style={styles.line}>
                        <View style={styles.icon_view}><Icon name='loveseat' color={PRIMARY_COLOR} size={sizeFont(5)}></Icon></View>
                        <Text style={styles.item_label}>Total seats : </Text>
                        <Text style={styles.item_content}>{this.state.bus_info.total_seats}</Text>
                    </View>
                    <View style={styles.line}>
                        <View style={styles.icon_view}><Icon name='money-bill' color={PRIMARY_COLOR} size={sizeFont(5)}></Icon></View>
                        <Text style={styles.item_label}>Total prices : </Text>
                        <Text style={styles.item_content}>{this.state.bus_info.total_pay}</Text>
                    </View> */}
                    {/* <View style={styles.line}>
                        <View style={styles.icon_view}><Icon name='money-bill' color={PRIMARY_COLOR} size={sizeFont(5)}></Icon></View>
                        <Text style={styles.item_label}>List orders : </Text>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                isShowList: !this.state.isShowList
                            })
                        }}>
                            <Text style={[styles.item_content,
                            {
                                borderRadius: 3, borderWidth: 0.5, borderColor: PRIMARY_COLOR,
                                paddingLeft: 10, paddingRight: 10
                            }]}>{this.state.isShowList ? 'Hide' : 'Show'}</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
                {
                    this.state.isShowList ?
                        <ScrollView styles={styles.list_user_order}>
                            <FlatList data={this.state.list}
                                renderItem={({ item }) => (<Item item={item} />)}
                                keyExtractor={(item, index) => index.toString()}
                            >

                            </FlatList>
                        </ScrollView>
                        :
                        <View></View>
                }

                <View style={styles.bottom_container}>
                    <TouchableOpacity style={styles.button_container} 
                        onPress = {() => {

                        }}
                    >
                        <Text style={styles.button_text}>Start</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button_container}
                        onPress = {() => {
                            
                        }}
                    >
                        <Text style={styles.button_text}>Stop</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    //
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    list_user_order: {
        flex: 1
    },
    info_bus: {
        marginLeft: sizeWidth(4),
        marginLeft: sizeHeight(5)
    },
    line: {
        flexDirection: 'row',
        marginBottom: sizeHeight(3),
    },
    bottom_container: {
        height  : sizeHeight(10),
        flexDirection : 'row',
        paddingLeft : sizeWidth(5),
        paddingRight : sizeWidth(5),
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom : sizeHeight(3)
    },
    button_container: {
        backgroundColor : `${PRIMARY_COLOR}`,
        paddingLeft : sizeFont(6),
        paddingRight : sizeFont(6),
        paddingBottom : sizeFont(2),
        paddingTop: sizeFont(2),
        borderRadius:  4,
    },
    button_text : {
        fontSize : sizeFont(4),
        color : 'white'
    },

    //item style
    item_container: {
        backgroundColor: 'white',
        marginLeft: sizeWidth(8),
    },
    item_name: {
        flexDirection: 'row'
    },
    item_contact: {
        flexDirection: 'row'
    },
    item_seats: {
        flexDirection: 'row'
    },
    item_checkin: {
        flexDirection: 'row'
    },
    item_oneline: {
        paddingLeft: sizeWidth(10),
        paddingRight: sizeWidth(10),
        paddingBottom: sizeWidth(3),
        paddingTop: sizeWidth(1),
    },
    item_label: {
        fontSize: sizeFont(4),
        color: 'gray',
        marginLeft: sizeWidth(5),
    },
    item_content: {
        fontSize: sizeFont(4),
        color: `${PRIMARY_COLOR}`,
        marginLeft: sizeWidth(5),
    },
    icon_view: {
        width: sizeWidth(10)
    }
})

const mapsDispatchToProps = (dispatch) => {
    return {
        show_loading: () => { dispatch(showLoading()) },
        hide_loading: () => { dispatch(hideLoading()) }
    }
}
export default connect(null, mapsDispatchToProps)(ListCustomer)