import {FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, UPDATE_LINKS} from './dataTypes';
import axios from 'axios';
import { fetchLinksFromState } from '../links/linksActions';
import { fetchSponsersFromState } from '../sponser/sponserActions';
import { fetchProfileFromState } from '../profile/profileActions';
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
export function updateLinks(links) {
    return {
        type: UPDATE_LINKS,
        payload:links
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
            }).catch(error => {
                dispatch(fetchDataFailure(error.message));
            }
        )
    }
}

export const updateAppearence = (theme) => {
    return function(dispatch){
        axios.put(base_URL+'/themes/update',{
            _id : theme._id,
            bodyStyle: theme.appearance.bodyStyle,
            cardStyle : theme.appearance.cardStyle
        } ,
        { 
            withCredentials: true,
            headers:{'Access-Control-Allow-Origin':'localhost:3000'} 
        }).then(response => {
                dispatch(fetchDataRequest());
            }).catch(error => {
                dispatch(fetchDataFailure(error.message));
            }
        )
    }
}