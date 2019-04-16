import {createStackNavigator} from 'react-navigation'
import profileScreen from '../screen/profile'
import Schedule from '../screen/driver-schedule.screen'
import ListCustomer from '../screen/list-customer'

export default createStackNavigator({
    Profile : {
        screen : profileScreen
    },
    // Schedule : {
    //     screen : Schedule
    // },
    // ListCustomer : {
    //     screen : ListCustomer
    // }
},{
    headerMode : 'none'
})