import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import { connect } from "react-redux";
import { sizeFont, sizeWidth } from "../helpers/size.helper";
import { checkIn, getConfig} from "../api/api";
import _ from "lodash";
import TimeHelper from "../helpers/time.helper";
import {PRIMARY_COLOR} from '../config/app.config'
import HeaderNav from '../component/headerNav'
import {
  ACTION_SHOW_LOADING,
  ACTION_HIDE_LOADING
} from "../actions/loading.action";
import imageBack from "../../res/img/ic_left_arrow.png";
import Icon from 'react-native-vector-icons/FontAwesome5Pro'
import moment from 'moment'
import { lang } from "../language/index";
const agent_id = "null";

class CheckInScreen extends Component {
  constructor(props) {
    super(props);
    this.state={currency : ''}
  }
  async componentWillMount () {
    await getConfig().then(result => {
      let status = _.get(result, 'status');
      if(status === 'ok') {
        let agent_info = _.get(result.data, 'agent_info')
         this.setState({
          currency : _.get(agent_info, 'currency_symbol')
        })
      }
      else {
        let error = _.get(result, 'error_description');
        console.log(error);
      }
    }).catch(err => {
      console.log(err.message);
    });
 }
  render() {
    
    const currency = this.state.currency;
    const data = this.props.navigation.getParam("data");
    //const type = _.get(data, "type");
    const order_number = _.get(data, "order_number");
    const pay_status = _.get(data, "pay_status");
    const return_pickup = _.get(data, "return_pickup");
    const pickup = _.get(data, "pickup");
    const customer = _.get(data, "customer");
    const firstname = _.get(customer, "firstname");
    const lastname = _.get(customer, "lastname");
    const start = _.get(data, "start");
    const return_start = _.get(data, "return_start");
    const return_route_id = _.get(data, "return_route_id");
    const checkin = _.get(data, "checkin");
    const seat = _.get(data, 'seat');
    const total = _.get(data, 'total');
    const type = (return_route_id == 0) ? 0 : 1;
    const from_place = data.bustrips[0].from_name;
    const to_place = data.bustrips[0].to_name;
   
    
    return (
      <View style={styles.container}>
        <HeaderNav title={lang('checkin.screen')} iconLeft='arrow-left' actionLeft={() => this.props.navigation.goBack()}/>
        <View style={style_item.container}>
                    <View style={style_item.trip_name}>
                        <Icon name='bus-alt' size={22} color={PRIMARY_COLOR}></Icon>
                        <View style={style_item.content_text}>
                            <Text>{from_place}</Text>
                            <Text>{to_place}</Text>
                        </View>
                    </View>
                    <View style={style_item.line}>
                        <Icon size={20} color={PRIMARY_COLOR} name='exchange-alt'></Icon>
                        <Text style={style_item.text_title}>{lang("checkin.type")}</Text>
                        <Text style={style_item.text_content}>{type === 1 ? lang("checkin.round_trip"):lang("checkin.one_way")}</Text>
                    </View>
                    <View style={style_item.line}>
                        <Icon size={20} color={PRIMARY_COLOR} name='user'></Icon>
                        <Text style={style_item.text_title}>{lang("checkin.customer")}</Text>
                        <Text style={style_item.text_content}>{firstname + ' ' + lastname}</Text>
                    </View>
                    <View style={style_item.line}>
                        <Icon size={20} color={PRIMARY_COLOR} name='map-marker-alt'></Icon>
                        <Text style={style_item.text_title}>{lang("checkin.start")}</Text>
                        <Text style={style_item.text_content}>{pickup}</Text>
                    </View>
                    <View style={style_item.line}>
                        <Icon size={20} color={PRIMARY_COLOR} name='calendar-edit'></Icon>
                        <Text style={style_item.text_title}>{lang("checkin.start_date")}</Text>
                        <Text style={style_item.text_content}>{moment(new Date(start)).format("DD-MM-YYYY")}</Text>
                    </View>
                    {
                        type == 1 ?
                            <View>
                                <View style={style_item.line}>
                                    <Icon size={20} color={PRIMARY_COLOR} name='map-marker-alt'></Icon>
                                    <Text style={style_item.text_title}>{lang("checkin.return")}</Text>
                                    <Text style={style_item.text_content}>{return_pickup}</Text>
                                </View>
                                <View style={style_item.line}>
                                    <Icon size={20} color={PRIMARY_COLOR} name='calendar-edit'></Icon>
                                    <Text style={style_item.text_title}>{lang("checkin.return_date")}</Text>
                                    <Text style={style_item.text_content}>{moment(new Date(return_start)).format("DD-MM-YYYY")}</Text>
                                </View>
                            </View>
                            :
                            <View>
                            </View>

                    }
                    <View style={style_item.line}>
                        <Icon size={20} color={PRIMARY_COLOR} name='loveseat'></Icon>
                        <Text style={style_item.text_title}>{lang("checkin.seat")}</Text>
                        <Text style={style_item.text_content}>{seat}</Text>
                    </View>
                    <View style={style_item.line}>
                        <Icon size={20} color={PRIMARY_COLOR} name='money-bill-alt'></Icon>
                        <Text style={style_item.text_title}>{lang("checkin.total_price")}</Text>
                        <Text style={style_item.text_content}>{parseInt(total) + ' ' + currency}</Text>
                    </View>
                </View>
                <TouchableOpacity style={[style_item.opa_btn, {backgroundColor : checkin === '1' ? 'green' : PRIMARY_COLOR}]} 
                      activeOpacity = {0.6}
                      disabled = {checkin === '1' ? true : false}
                      onPress={()=>{
                          this.onPressCheckIn();
                }}>
                    <Text style={{ color: 'white', fontSize: 16 }}>{checkin === '1' ? lang("checkin.already_checkin") : lang("checkin.checkin")}</Text>
                </TouchableOpacity>
      </View>
    );
  }

  onPressCheckIn = async () => {
    const data = this.props.navigation.getParam("data");
    const order_number = _.get(data, "order_number");
    const body = { order_number, agent_id };
    this.props.showLoading();
    await checkIn(body)
      .then(result => {
        this.props.hideLoading(); 
        Alert.alert(
          lang("alert.success"),
          lang("alert.checkin_success"),
          [{ text: "OK", onPress: () => this.props.navigation.goBack() }],
          { cancelable: false }
        );
      })
      .catch(error => {
        this.props.hideLoading();
        Alert.alert(
          "ERROR",
          error.message,
          [{ text: "OK", onPress: () => this.props.navigation.goBack() }],
          { cancelable: false }
        );
      });
  };
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  viewBack: {
    marginTop: sizeWidth(10),
    marginLeft: sizeWidth(4),
    width: sizeWidth(12)
  },
  imageBack: {
    padding: sizeWidth(2),
    width: sizeWidth(12),
    height: sizeWidth(5)
  },
  title: {
    fontSize: sizeFont(6),
    fontWeight: "bold",
    color: "black",
    marginTop: sizeWidth(10)
  },
  textCode: {
    fontSize: sizeFont(6),
    color: "black",
    marginTop: sizeWidth(12)
  },
  textPaid: {
    fontSize: sizeFont(6),
    color: "black",
    marginTop: sizeWidth(2),
    fontWeight: "bold"
  },
  textName: {
    fontSize: sizeFont(6),
    color: "black"
  },
  viewButtonChecIn: {
    marginTop: sizeWidth(10),
    width: sizeWidth(70),
    height: sizeWidth(12),
    borderRadius: sizeWidth(3),
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: `${PRIMARY_COLOR}`
  },
  textCheckIn: {
    fontSize: sizeFont(5),
    fontWeight: "bold",
    color: "white"
  },
  textPickUp: {
    fontSize: sizeFont(6),
    color: "black"
  },
  textTitle: {
    fontSize: sizeFont(4),
    color: "black"
  }
});

const style_item = StyleSheet.create({
  trip_name: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      justifyContent: 'center',
  },
  content_text: {
      marginLeft: 8,
      marginRight: 8,
  },
  line: {
      marginTop: 15,
      flexDirection: 'row',
      paddingLeft: 20,
  },
  text_title: {
      marginRight: 10,
      marginLeft: 10,
      fontSize: 16
  },
  text_content: {
      color: `${PRIMARY_COLOR}`,
      fontSize: 16,
      fontWeight: 'bold',
  },
  container: {
      padding: 15,
      flex: 1
  },
  opa_btn: {
      height: 40,
      backgroundColor: `${PRIMARY_COLOR}`,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      marginLeft: 30,
      marginRight: 30,
      borderRadius: 5,
  }
})

const mapDispatchToProps = {
  showLoading: () => ({ type: ACTION_SHOW_LOADING }),
  hideLoading: () => ({ type: ACTION_HIDE_LOADING })
};

export default connect(
  null,
  mapDispatchToProps
)(CheckInScreen);
