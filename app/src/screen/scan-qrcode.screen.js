import React, { Component } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
//import QRCodeScanner from 'react-native-qrcode-scanner';
import iconBack from "../../res/img/ic_left_arrow.png";
import { sizeWidth } from "../helpers/size.helper";
import { CameraKitCamera, CameraKitCameraScreen } from 'react-native-camera-kit'

export default class ScanQRCodeScreen extends Component {

  async  componentWillMount() {
    const isCameraAuthorized = await CameraKitCamera.checkDeviceCameraAuthorizationStatus();
    console.log(isCameraAuthorized);
    if (isCameraAuthorized === -1) {
      const isUserAuthorizedCamera = await CameraKitCamera.requestDeviceCameraAuthorization();
    }
  }
  onSuccess(e) {
    const onQRCode = this.props.navigation.getParam("onQRCode");
    if (onQRCode) {
      onQRCode(e.nativeEvent.codeStringValue);
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <CameraKitCameraScreen
        scanBarcode={true}
        onReadCode={this.onSuccess.bind(this)}
        colorForScannerFrame={'black'}
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
