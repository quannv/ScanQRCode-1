import {CHANGE_LANGUAGE } from '../actions/language.action'
const defaultState = {
    language : null
}
export const languageReducer = (state = defaultState, action) => {
    switch(action.type) {
        case CHANGE_LANGUAGE : {
            return Object.assign({}, state, {language:action.lang})
        }
        default : return state
    }
}