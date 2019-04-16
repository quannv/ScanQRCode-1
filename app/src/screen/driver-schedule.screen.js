import React, { Component } from 'react'
import {
    View, Text, TouchableOpacity, StyleSheet, FlatList, TouchableHighlight
} from 'react-native'
import HeaderNav from '../component/headerNav'
import { sizeFont, sizeHeight, sizeWidth } from '../helpers/size.helper'
import Icon from 'react-native-vector-icons/FontAwesome5Pro'
import { PRIMARY_COLOR } from '../config/app.config'
import Oneline from '../component/oneline'
import DateTimePicker from 'react-native-modal-datetime-picker'
import TimeHelper from '../helpers/time.helper'
import { get_schedule } from '../api/api'
import { showLoading, hideLoading } from '../actions/loading.action'
import { connect } from 'react-redux'
import AsyncstorageHelper from '../helpers/asyncstorage.helper'

class Item extends Component {
    render() {
        const { item, navigation } = this.props;
        return (
            <View>
                <TouchableOpacity style={styles.item_container} 
                                onPress = {()=>{
                                    navigation.navigate('ListCustomer', {'item' : item})
                                }}
                >
                    <View style={styles.item_time}>
                        <Icon name='clock' color={PRIMARY_COLOR} size={sizeFont(5)}></Icon>
                        <Text style={{ fontSize: sizeFont(4), marginLeft: sizeWidth(3), color: PRIMARY_COLOR }}>{item.info_bustrip.start_time} - {item.info_bustrip.end_time}</Text>
                    </View>
                    <View style={styles.item_from}>
                        <Icon name='map-marker-alt' color={PRIMARY_COLOR} size={sizeFont(5)}></Icon>
                        {/* <Text style={{ marginLeft: sizeWidth(2) }}>From: </Text> */}
                        <Text style={{ fontSize: sizeFont(4), marginLeft: sizeWidth(3), color: PRIMARY_COLOR }} numberOfLines={2}>{item.info_bustrip.from_title}</Text>
                    </View>
                    <View style={styles.item_to}>
                        <Icon name='map-marker-alt' color={PRIMARY_COLOR} size={sizeFont(5)}></Icon>
                        {/* <Text style={{ marginLeft: sizeWidth(2) }}>To: </Text> */}
                        <Text style={{ fontSize: sizeFont(4), marginLeft: sizeWidth(3), color: PRIMARY_COLOR }}>{item.info_bustrip.to_title} </Text>
                    </View>
                    <View style={styles.item_booked}>
                        <Icon name='ticket-alt' color={PRIMARY_COLOR} size={sizeFont(5)}></Icon>
                        <Text style={{ marginLeft: sizeWidth(2) }}>Person(s): </Text>
                        <Text style={{ fontSize: sizeFont(4), marginLeft: sizeWidth(3), color: PRIMARY_COLOR }}>{item.seat_total}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ paddingLeft: sizeWidth(10), paddingRight: sizeWidth(5) }}>
                    <Oneline color={PRIMARY_COLOR} />
                </View>
            </View>
        );
    }
}

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            isShowDateModal: false,
            schedule_data: [],
            isToday: true,
            date_schedule: TimeHelper.formatDate(new Date(), 'YYYY-MM-DD'),
            driver_id: ''
        }
    }
    async componentWillMount() {
        await AsyncstorageHelper._retrieveData('userData').then(user => {
            this.setState({
                driver_id : JSON.parse(user).id
            })
        });
        
        this.props.show_loading();
        let res = await get_schedule(this.state.driver_id, this.state.date_schedule);
        if (res.status == 1) {
            this.setState({
                schedule_data: res.data
            })
        }
        this.props.hide_loading();
    }
    async load_schedule() {
        this.props.show_loading();
        let res = await get_schedule(this.state.driver_id, this.state.date_schedule);
        if (res.status == 1) {
            this.setState({
                schedule_data: res.data
            })
        }
        this.props.hide_loading();

    }

    render() {
        _data = [1, 2, 4, 5, 6, 7, 8, 9]
        return (
            <View style={styles.container}>
                <HeaderNav
                    iconLeft='bars'
                    actionLeft={() => { this.props.navigation.openDrawer() }}
                    title='Schedule'
                    iconRight='redo-alt' actionRight={() => this.load_schedule()}
                />
                <View style={styles.schedule_container}>
                    <TouchableOpacity style={styles.search_contanier}
                        onPress={() => {
                            this.setState({ isShowDateModal: true })
                        }}
                    >
                        <Icon name='calendar-edit' color={PRIMARY_COLOR} size={sizeFont(6)}></Icon>
                        <Text style={styles.date_value} >{this.state.date_schedule}</Text>
                        {
                            this.state.isToday ? <Text style={styles.date_value}>( Today )</Text>
                                :
                                <Text></Text>
                        }
                    </TouchableOpacity>
                    <DateTimePicker isVisible={this.state.isShowDateModal}
                        onConfirm={(date) => {
                            let date_format = TimeHelper.formatDate(date, 'YYYY-MM-DD');
                            if(date_format == TimeHelper.formatDate(new Date(), 'YYYY-MM-DD')) {
                                this.setState({
                                    isToday : true,
                                    isShowDateModal: false,
                                    date_schedule: date_format
                                }, () => { this.load_schedule() });
                            }
                            else {
                                this.setState({
                                    isToday : false,
                                    isShowDateModal: false,
                                    date_schedule: date_format
                                }, () => { this.load_schedule() });
                            }
                            
                        }}
                        onCancel={() => { this.setState({ isShowDateModal: false }) }}
                    ></DateTimePicker>
                    {
                        this.state.schedule_data.length > 0 ?
                            <FlatList
                                data={this.state.schedule_data}
                                renderItem={({ item }) => (<Item item={item} navigation={this.props.navigation}/>)}
                                keyExtractor={(item, index) => index.toString()}

                            >
                            </FlatList>
                            :
                            <View style={styles.empty_container}>
                                 <Text style={styles.empty_text}>
                                    Empty schedule </Text>
                                 <TouchableOpacity style={styles.refreshing} 
                                        onPress = {()=>{
                                            this.load_schedule();
                                        }}
                                 >
                                        <Icon name='redo-alt' color={PRIMARY_COLOR} size={sizeFont(6)}></Icon>
                                     </TouchableOpacity>  
                            </View>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    schedule_container: {
        marginTop: sizeHeight(2)
    },
    search_contanier: {
        height: sizeHeight(5),
        alignItems: 'center',
        flexDirection: 'row',
        margin: 0,
        justifyContent: 'center',
    },
    date_value: {
        fontSize: sizeFont(4),
        color: `${PRIMARY_COLOR}`,
        marginLeft: sizeWidth(5)
    },
    empty_container: {
        height: sizeHeight(10),
        justifyContent: 'center',
        alignItems: 'center'
    },
    empty_text: {
        color: `${PRIMARY_COLOR}`,
        fontSize: sizeFont(4),
        marginBottom:  sizeHeight(2),
    },
    refreshing : {
        
    },

    //item style
    item_container: {
        height: sizeHeight(16),
        backgroundColor: 'white',
        marginTop: sizeHeight(2),
    },
    item_time: {
        height: sizeHeight(4),
        padding: 2,
        flexDirection: 'row',
        paddingLeft: sizeWidth(5)
    },
    item_from: {
        height: sizeHeight(4),
        padding: 2,
        flexDirection: 'row',
        paddingLeft: sizeWidth(5)
    },
    item_to: {
        height: sizeHeight(4),
        padding: 2,
        flexDirection: 'row',
        paddingLeft: sizeWidth(5)
    },
    item_booked: {
        height: sizeHeight(4),
        padding: 2,
        flexDirection: 'row',
        paddingLeft: sizeWidth(5)
    }
})

const mapsDispatchToProps = (dispatch) => {
    return {
        show_loading: () => { dispatch(showLoading()) },
        hide_loading: () => { dispatch(hideLoading()) }
    }
}

export default connect(null, mapsDispatchToProps)(Schedule)