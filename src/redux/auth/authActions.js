import {AUTH_LOGIN, AUTH_LOGOUT} from './authType';


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

