import React, { Component } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
//import QRCodeScanner from 'react-native-qrcode-scanner';
import iconBack from "../../res/img/ic_left_arrow.png";
import { sizeWidth } from "../helpers/size.helper";
import { CameraKitCamera, CameraKitCameraScreen } from 'react-native-camera-kit'
import Header from '../component/headerNav'

export default class ScanQRCodeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScan: true
    }
  }

  async componentWillMount() {
    this.setState({
      isScan: true
    })

  }

  onSuccess(e) {
    const onQRCode = this.props.navigation.getParam("onQRCode");
    if (onQRCode) {
      onQRCode(e.nativeEvent.codeStringValue);
    }
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header
          iconLeft='arrow-left'
          actionLeft={() => { this.props.navigation.goBack() }}
        />
        <CameraKitCameraScreen
          scanBarcode={true}
          onReadCode={(e) => {
            if (this.state.isScan) {
              this.onSuccess(e); 
            }
            this.setState({ isScan: false })
          }

          }
          colorForScannerFrame={'black'}
        />
      </View>
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
