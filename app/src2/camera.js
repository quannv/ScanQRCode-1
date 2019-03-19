import React, { Component } from 'react'
import {
    View,
    Alert
} from 'react-native'
import { CameraKitCameraScreen, CameraKitCamera, CameraScreen } from 'react-native-camera-kit'
//import ScanQRCode from 'react-native-qrcode-scanner'
export default class CameraScreen_ extends Component {
    async  componentWillMount() {
        const isCameraAuthorized = await CameraKitCamera.checkDeviceCameraAuthorizationStatus();
        console.log(isCameraAuthorized);
        if (isCameraAuthorized === -1) {
            const isUserAuthorizedCamera = await CameraKitCamera.requestDeviceCameraAuthorization();
        }


    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <CameraKitCameraScreen
                    showFrame={false}
                    //Show/hide scan frame
                    scanBarcode={true}
                    //Can restrict for the QR Code only
                    laserColor={'blue'}
                    //Color can be of your choice
                    frameColor={'yellow'}
                    //If frame is visible then frame color
                    colorForScannerFrame={'black'}
                    //Scanner Frame color
                    onReadCode={event =>
                      alert(event.nativeEvent.codeStringValue)
                    }

                />
            </View>
        )
    }
}