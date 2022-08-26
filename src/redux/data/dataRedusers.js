import {FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, UPDATE_APPEARANCE} from './dataTypes';

const initialState = {
    loading: true,
    data: {
        appearance:{},
        profile:{},
        _id:'',
        userID:'',
        userName:'',
        links:[],
        sponsers:[]
    },
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
        case UPDATE_APPEARANCE:
            return {
                ...state,
                data:{
                    ...state.data,
                    appearance:action.payload
                }
            }
        default:
            return state;
    }
}


export default dataReducer;