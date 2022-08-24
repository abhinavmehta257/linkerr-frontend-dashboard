import { ADD_SPONSER, } from "./sponsersType"
import { DELETE_SPONSER, } from "./sponsersType"
import { EDIT_SPONSER } from "./sponsersType"
import { FETCH_SPONSERS } from "./sponsersType"
import { FETCH_SPONSERS_SUCCESS } from "./sponsersType"

const initialState = {
    loading: true,
    data: [],
    error: ''
}

const sponsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SPONSER:
            return {
                ...state,
                data: [action.payload,...state.data]
            }
        case DELETE_SPONSER:
            return {
                ...state,
                data: state.data.filter(sponser => sponser.id !== action.payload)
            }
        case EDIT_SPONSER:
            return {
                ...state,
                data: state.data.map(sponser => sponser.id === action.payload.id ? action.payload : sponser)
            }
        case FETCH_SPONSERS:
            return {
                loading: true,
                ...state
            }
        case FETCH_SPONSERS_SUCCESS:
            return {
                loading: false,
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}




export default sponsersReducer;

