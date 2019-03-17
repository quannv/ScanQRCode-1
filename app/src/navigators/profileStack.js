import {createStackNavigator} from 'react-navigation'
import profileScreen from '../screen/profile'

export default createStackNavigator({
    Profile : {
        screen : profileScreen
    }
},{
    headerMode : 'none'
})