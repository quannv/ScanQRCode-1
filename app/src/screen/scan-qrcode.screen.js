import React, { Component } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import iconBack from "../../res/img/ic_left_arrow.png";
import { sizeWidth } from "../helpers/size.helper";

export default class ScanQRCodeScreen extends Component {
  onSuccess(e) {
    const onQRCode = this.props.navigation.getParam("onQRCode");
    if (onQRCode) {
      onQRCode(e.data);
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        topContent={
          <View style={styles.viewImage}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                source={iconBack}
                style={styles.imageBack}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          </View>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  viewImage: {
    height: sizeWidth(16),
    marginBottom: sizeWidth(5),
    alignSelf: "flex-start"
  },
  imageBack: {
    width: sizeWidth(10),
    height: sizeWidth(5),
    marginLeft: sizeWidth(4)
  }
});
