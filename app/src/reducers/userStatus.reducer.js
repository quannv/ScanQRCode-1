import {USER_STATUS} from '../actions/userStatus.action'
const defaultState = {
    userStatus : USER_STATUS.LOADING_STATUS
}
export const userStatusReducer = (state = defaultState, action) => {
    switch (action.type) {
        case USER_STATUS.AUTHORIZED : {
            return {
                userStatus : USER_STATUS.AUTHORIZED
            }
        }
        case USER_STATUS.LOADING_STATUS : {
            return {
                userStatus : USER_STATUS.LOADING_STATUS
            }
        }
        default : return state;
    }
}

