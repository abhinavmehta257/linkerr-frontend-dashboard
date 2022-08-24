import {AUTH_LOGIN, AUTH_LOGOUT} from './authType';
import axios from 'axios';
import {Navigate} from 'react-router-dom';
import Cookies from 'js-cookie'
import {base_URL} from '../'
import Axios from 'axios'

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
export const  loginRequest = (formData, setError) => {
    return (dispatch) => {
        axios.post(base_URL+'/auth/login', formData,)
            .then(res => {
                const token = res.data.token;
                Cookies.set('token', res.data.token,{path:'', expires:7});
                dispatch(login(res.data.token));
                console.log(token);
                Axios.defaults.headers.common['token'] = token;
                return <Navigate to='/' />
            }).catch(err => {
                console.log(err);
                setError(err.response.data.error);
            })
    }
}
