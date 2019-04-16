import {createStackNavigator} from 'react-navigation'
import Schedule from '../screen/driver-schedule.screen'
import ListCustomer from '../screen/list-customer'

export default createStackNavigator({
    Schedule : {
        screen : Schedule
    },
    ListCustomer : {
        screen : ListCustomer
    }
},{
    headerMode : 'none'
})