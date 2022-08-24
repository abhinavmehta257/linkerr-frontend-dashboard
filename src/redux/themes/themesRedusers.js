import {FETCH_THEMES, FETCH_THEMES_SUCCESS, FETCH_THEMES_FAILURE} from './themesTypes';

const initialState = {
    loading: true,
    data: [],
    error: ''
}

const themesReducer = (state=initialState,action) => {
    switch(action.type){
        case FETCH_THEMES:
            return {
                ...state,
                loading: true
            }
        case FETCH_THEMES_SUCCESS:
            return {
                ...state,
                loading: false,
                themes: action.payload
            }
        case FETCH_THEMES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}


export default themesReducer;