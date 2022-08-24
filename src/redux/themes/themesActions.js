import {FETCH_THEMES, FETCH_THEMES_SUCCESS, FETCH_THEMES_FAILURE, UPDATE_LINKS} from './themesTypes';
import axios from 'axios';
import { fetchLinksFromState } from '../links/linksActions';
import { fetchSponsersFromState } from '../sponser/sponserActions';
import { fetchProfileFromState } from '../profile/profileActions';
import {useSelector} from 'react-redux';
import {base_URL} from '..'

export function fetchThemes() {
    return {
        type: FETCH_THEMES
    };
}
export function fetchThemesSuccess(data) {
    return {
        type: FETCH_THEMES_SUCCESS,
        payload:data
    };
}
export function fetchThemesFailure(error) {
    return {
        type: FETCH_THEMES_FAILURE,
        payload:error
    };
}
export function updateLinks(links) {
    return {
        type: UPDATE_LINKS,
        payload:links
    };
}

export const fetchThemesRequest = () => {
    return function(dispatch){
        dispatch(fetchThemes());
        axios.get(base_URL+'/page',{ withCredentials: true, })
            .then(response => {
                const data = response.data[0];
                dispatch(fetchThemesSuccess(data));
            }).catch(error => {
                dispatch(fetchThemesFailure(error.message));
            }
        )
    }
}
