import { createStackNavigator } from 'react-navigation'
import LoginScreen from '../screen/login.screen'

export default createStackNavigator(
    {
        LoginScreen : {
            screen : LoginScreen
        }
    },
    {
        headerMode : 'none'
    }

);