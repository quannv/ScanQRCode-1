import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Button
} from "react-native";
import { sizeFont, sizeWidth, sizeHeight} from "../helpers/size.helper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { verify, getConfig} from "../api/api";
import { PRIMARY_COLOR } from '../config/app.config'
import Icon from 'react-native-vector-icons/FontAwesome5Pro'
import {
  ACTION_SHOW_LOADING,
  ACTION_HIDE_LOADING
} from "../actions/loading.action";
import _ from "lodash";
import Header from '../component/headerNav'
import {lang} from '../language/index'
class VerifyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { code: null, currency : '$' };
  }
  
  componentWillMount () {
   //AsyncStorageHelper._retrieveData('language').then(a=>{console.log(a);});
   
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Header 
            iconLeft = 'bars'
            actionLeft = {()=> {this.props.navigation.openDrawer()}}
          />
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: "center" }}>
              <View style={styles.header}>
                <Icon name='steering-wheel' size={sizeFont(8)} color={PRIMARY_COLOR}></Icon>
                <Text style={styles.title}>TBUS Driver</Text>
              </View>

              <TouchableOpacity
                style={styles.viewButtonScanQrcode}
                activeOpacity={0.6}
                onPress={() =>
                  this.props.navigation.navigate("ScanQRCode", {
                    onQRCode: this.onQRCode
                  })
                }
              >
                <Text style={styles.textScanCode}>{lang('verify.scan_qrcode')}</Text>
              </TouchableOpacity>

              <Text style={styles.textOr}>{lang('verify.or')}</Text>

              <TouchableOpacity
                style={styles.viewTiketNumber}
                activeOpacity={0.6}
              >
                <TextInput
                  ref={ref => (this.ticketInput = ref)}
                  returnKeyType={"done"}
                  style={styles.textTicket}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  value={this.state.code}
                  placeholder={lang('verify.enter_number_order')}
                  placeholderTextColor={"#7C7C7C"}
                  underlineColorAndroid="transparent"
                  onChangeText={text => this.setState({ code: text })}
                  selectionColor={PRIMARY_COLOR}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.viewButtonVerify}
                activeOpacity={0.6}
                onPress={() => this.onPressVerify()}
              >
                <Text style={styles.textVerify}>{lang("verify.verify")}</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  onQRCode = qrcode => {
    if (qrcode) {
      this.onPressVerify(qrcode);
    }
  };

  onPressVerify = async qrcode => {
    const code = qrcode || this.state.code;
    if (!code) {
      alert(lang('alert.enter_code_or_scan'));
    } else {
      this.props.showLoading();
      await verify(code, null)
        .then(result => {
          this.props.hideLoading();
          const status = _.get(result, "status");
          if (status === "ok") {
            console.log(_.get(result, 'data'));
            this.props.navigation.navigate("CheckIn", { data: result.data });
          } else {
            alert(lang('alert.invalid_order_number'));
          }
        })
        .catch(error => {
          this.props.hideLoading();
          alert(error.message);
        });
    }
  };
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", alignItems: "center" },
  header : {
    marginTop: sizeWidth(2),
    alignItems: 'center'
  },
  title: {
    fontSize: sizeFont(6),
    fontWeight: "bold",
    color: `${PRIMARY_COLOR}`,
    marginTop: sizeWidth(2)
  },
  viewButtonScanQrcode: {
    marginTop: sizeWidth(15),
    width: sizeWidth(45),
    height: sizeWidth(35),
    borderRadius: sizeWidth(3),
    borderWidth: sizeWidth(0.4),
    borderColor: `${PRIMARY_COLOR}`,
    alignItems: "center",
    justifyContent: "center"
  },
  textScanCode: {
    fontSize: sizeFont(4),
    color: `${PRIMARY_COLOR}`,
    fontWeight: "bold"
  },
  textOr: {
    marginTop: sizeWidth(10),
    fontSize: sizeFont(7),
    color: `${PRIMARY_COLOR}`
  },
  viewTiketNumber: {
    marginTop: sizeWidth(10),
    width: sizeWidth(70),
    height: sizeWidth(15),
    borderRadius: sizeWidth(3),
    borderWidth: sizeWidth(0.4),
    borderColor: `${PRIMARY_COLOR}`,
    alignItems: "center",
    justifyContent: "center"
  },
  textTicket: {
    width: sizeWidth(65),
    fontSize: sizeFont(4),
    textAlign: "center",
    color: "black",
    padding: 0
  },
  viewButtonVerify: {
    marginTop: sizeWidth(7),
    width: sizeWidth(70),
    height: sizeWidth(12),
    borderRadius: sizeWidth(3),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${PRIMARY_COLOR}`
  },
  textVerify: {
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
)(VerifyScreen);
