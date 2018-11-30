import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { sizeFont, sizeWidth } from "../helpers/size.helper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { verify } from "../api/api";
import {
  ACTION_SHOW_LOADING,
  ACTION_HIDE_LOADING
} from "../actions/loading.action";

class VerifyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { code: null };
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.title}>TBUS</Text>

              <TouchableOpacity
                style={styles.viewButtonScanQrcode}
                activeOpacity={0.6}
                onPress={() =>
                  this.props.navigation.navigate("ScanQRCode", {
                    onQRCode: this.onQRCode
                  })
                }
              >
                <Text style={styles.textScanCode}>ScanQR Code</Text>
              </TouchableOpacity>

              <Text style={styles.textOr}>Or</Text>

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
                  placeholder="#Enter ticket number"
                  placeholderTextColor={"#7C7C7C"}
                  underlineColorAndroid="transparent"
                  onChangeText={text => this.setState({ code: text })}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.viewButtonVerify}
                activeOpacity={0.6}
                onPress={() => this.onPressVerify(this.state.code)}
              >
                <Text style={styles.textVerify}>Verify</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  onQRCode = code => {
    if (code) {
      this.onPressVerify(code);
    }
  };

  onPressVerify = async code => {
    if (!code) {
      alert("Please enter your code or scan qrcode.");
    } else {
      this.props.showLoading();
      await verify(code, null)
        .then(result => {
          this.props.hideLoading();
          this.props.navigation.navigate("CheckIn", { data: result.data });
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
  title: {
    fontSize: sizeFont(6),
    fontWeight: "bold",
    color: "black",
    marginTop: sizeWidth(10)
  },
  viewButtonScanQrcode: {
    marginTop: sizeWidth(15),
    width: sizeWidth(45),
    height: sizeWidth(35),
    borderRadius: sizeWidth(3),
    borderWidth: sizeWidth(0.4),
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  textScanCode: {
    fontSize: sizeFont(4),
    color: "black",
    fontWeight: "bold"
  },
  textOr: {
    marginTop: sizeWidth(10),
    fontSize: sizeFont(7),
    color: "black"
  },
  viewTiketNumber: {
    marginTop: sizeWidth(10),
    width: sizeWidth(70),
    height: sizeWidth(15),
    borderRadius: sizeWidth(3),
    borderWidth: sizeWidth(0.4),
    borderColor: "black",
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
    backgroundColor: "#6b76ff"
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
