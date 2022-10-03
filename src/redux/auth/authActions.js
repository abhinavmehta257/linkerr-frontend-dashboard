import {AUTH_LOGIN, AUTH_LOGOUT} from './authType';
import Cookies from 'js-cookie'


export const login = (token) => {
    return {
        type: AUTH_LOGIN,
        payload: token
    }
}

export const logout = () => {
    return {
        type: AUTH_LOGOUT
    }
}

export const deleteAuthTokenAndLogout = () => {
    return function(dispatch){
        Cookies.set('token', '');
        dispatch(logout());
    }
}

