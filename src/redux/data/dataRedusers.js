import {FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE} from './dataTypes';

const initialState = {
    loading: true,
    data: {},
    error: ''
}

const dataReducer = (state=initialState,action) => {
    switch(action.type){
        case FETCH_DATA:
            return {
                ...state,
                loading: true
            }
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case FETCH_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}


export default dataReducer;