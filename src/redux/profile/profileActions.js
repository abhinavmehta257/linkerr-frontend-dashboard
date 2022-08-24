import { EDIT_PROFILE } from "./profileTypes";
import axios from "axios";
import {base_URL} from '../'

export const editProfile = (profile) => {
    return {
        type: EDIT_PROFILE,
        payload: profile,
    };
    };

export const fetchProfileFromState = (profile) => {
    return function (dispatch) {
        dispatch(editProfile(profile));
    }
}

export const updateProfile = (profile) => {
    return function (dispatch) {
        axios.post(base_URL + "/profile/updateProfile", profile, { withCredentials: true })
            .then(res => {
                console.log(res);
                dispatch(editProfile(profile));
            }
        );
    }
}