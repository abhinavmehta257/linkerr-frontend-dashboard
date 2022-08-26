import {FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, UPDATE_APPEARANCE} from './dataTypes';
import axios from 'axios';
import { fetchLinksFromState } from '../links/linksActions';
import { fetchSponsersFromState } from '../sponser/sponserActions';
import { fetchProfileFromState } from '../profile/profileActions';
import {fetchThemesRequest} from '../themes/themesActions'
import {useSelector} from 'react-redux';
import {base_URL} from '../'

export function fetchData() {
    return {
        type: FETCH_DATA
    };
}
export function fetchDataSuccess(data) {
    return {
        type: FETCH_DATA_SUCCESS,
        payload:data
    };
}
export function fetchDataFailure(error) {
    return {
        type: FETCH_DATA_FAILURE,
        payload:error
    };
}
export function updateAppearenceInState(appearance) {
    return {
        type: UPDATE_APPEARANCE,
        payload:appearance
    };
}

export const fetchDataRequest = () => {
    return function(dispatch){
        dispatch(fetchData());
        axios.get(base_URL+'/page',{ withCredentials: true, })
            .then(response => {
                const data = response.data[0];
                dispatch(fetchDataSuccess(data));
                dispatch(fetchLinksFromState(data.links));
                dispatch(fetchProfileFromState(data.profile));
                dispatch(fetchSponsersFromState(data.sponsers));
                dispatch(fetchThemesRequest());
            }).catch(error => {
                dispatch(fetchDataFailure(error.message));
            }
        )
    }
}

export const updateAppearence = (theme) => {
    const appearance = {
        _id : theme._id,
        bodyStyle: theme.appearance.bodyStyle,
        cardStyle : theme.appearance.cardStyle
    }
    return function(dispatch){
        axios.put(base_URL+'/themes/update',appearance ,
        { 
            withCredentials: true,
            headers:{'Access-Control-Allow-Origin':'localhost:3000'} 
        }).then(response => {
                dispatch(updateAppearenceInState(appearance));
            }).catch(error => {
                dispatch(fetchDataFailure(error.message));
            }
        )
    }
}