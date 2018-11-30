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
import { checkIn } from "../api/api";
import _ from "lodash";
import TimeHelper from "../helpers/time.helper";
import {
  ACTION_SHOW_LOADING,
  ACTION_HIDE_LOADING
} from "../actions/loading.action";
import imageBack from "../../res/img/ic_left_arrow.png";

const agent_id = "null";

class CheckInScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.navigation.getParam("data");
    console.log(JSON.stringify(data));
    const type = _.get(data, "type");
    const created_by_account = _.get(data, "created_by_account");
    const order_number = _.get(data, "order_number");
    const pay_status = _.get(data, "pay_status");
    const lastname = _.get(created_by_account, "lastname");
    const address = _.get(created_by_account, "address");
    const birthday = _.get(created_by_account, "birthday");
    const birthdayFormat = TimeHelper.formatDate(birthday, "DD-MM-YYYY");
    const return_pickup = _.get(data, "return_pickup");
    const pickup = _.get(data, "pickup");
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.viewBack}
          onPress={() => this.props.navigation.goBack()}
        >
          <Image
            resizeMode="contain"
            source={imageBack}
            style={styles.imageBack}
          />
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>{type}</Text>

          <Text style={styles.textCode}>{order_number}</Text>
          <Text style={styles.textPaid}>
            {pay_status === "SUCCESS" ? "PAID" : "UNPAID"}
          </Text>
          <Text style={[styles.textName, { marginTop: sizeWidth(4) }]}>
            {lastname}
          </Text>
          <Text style={[styles.textName]}>{address}</Text>

          {pickup || return_pickup ? (
            <Text
              style={[styles.textName]}
            >{`${pickup} ${return_pickup}`}</Text>
          ) : (
            <View />
          )}

          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.textName]}>{birthdayFormat}</Text>
          </View>

          <TouchableOpacity
            style={styles.viewButtonChecIn}
            activeOpacity={0.6}
            onPress={this.onPressCheckIn}
          >
            <Text style={styles.textCheckIn}>CheckIn</Text>
          </TouchableOpacity>
        </View>
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
        alert("Checkin success");
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
    backgroundColor: "#6b76ff"
  },
  textCheckIn: {
    fontSize: sizeFont(5),
    fontWeight: "bold",
    color: "white"
  }
});

const mapDispatchToProps = {
  showLoading: () => ({ type: ACTION_SHOW_LOADING }),
  hideLoading: () => ({ type: ACTION_HIDE_LOADING })
};

export default connect(
  null,
  mapDispatchToProps
)(CheckInScreen);
