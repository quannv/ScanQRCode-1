import { createStackNavigator } from "react-navigation";
import VerifyScreen from "../screen/verfify.screen";
import CheckInScreen from "../screen/checkin.screen";
import ScanQRCodeScreen from "../screen/scan-qrcode.screen";

const stackNavigatorOptions = {
  initialRouteName: "Verify",
  headerMode: "none",
  cardStyle: {
    backgroundColor: "white"
  }
};

export const AppNavigator = createStackNavigator(
  {
    Verify: { screen: VerifyScreen },
    CheckIn: { screen: CheckInScreen },
    ScanQRCode: { screen: ScanQRCodeScreen }
  },
  stackNavigatorOptions
);
