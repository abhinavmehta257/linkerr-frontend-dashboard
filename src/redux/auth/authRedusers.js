import {AUTH_LOGIN, AUTH_LOGOUT} from './authType';

const initialState = {
    isLoggedIn: false,
    token: ''
}

const authRedusers = (state=initialState,action) => {
    switch(action.type){
        case AUTH_LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload
            }
        case AUTH_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: ''
            }
        default:
            return state;
    }
}

export default authRedusers;