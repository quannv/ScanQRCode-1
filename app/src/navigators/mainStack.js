import { createStackNavigator } from "react-navigation";
import VerifyScreen from "../screen/verfify.screen";
import CheckInScreen from "../screen/checkin.screen";
import ScanQRCodeScreen from "../screen/scan-qrcode.screen";
import Chooselanguage from "../screen/chooselanguage.screen";
const stackNavigatorOptions = {
  initialRouteName: "Verify",
  headerMode: "none",
  cardStyle: {
    backgroundColor: "white"
  }
};

export default Main = createStackNavigator(
  {
    Chooselanguage : {screen:Chooselanguage},
    Verify: { screen: VerifyScreen },
    CheckIn: { screen: CheckInScreen },
    ScanQRCode: { screen: ScanQRCodeScreen }
  },
  stackNavigatorOptions
);