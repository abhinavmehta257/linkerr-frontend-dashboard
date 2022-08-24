import { ADD_LINK, } from "./linksType"
import { DELETE_LINK, } from "./linksType"
import { EDIT_LINK } from "./linksType"
import { FETCH_LINKS } from "./linksType"
import { FETCH_LINKS_SUCCESS } from "./linksType"

const initialState = {
    loading: true,
    data: [],
    error: ''
}

const linksReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LINK:
            return {
                ...state,
                data: [action.payload,...state.data]
            }
        case DELETE_LINK:
            return {
                ...state,
                data: state.data.filter(link => link.id !== action.payload)
            }
        case EDIT_LINK:
            return {
                ...state,
                data: state.data.map(link => link.id === action.payload.id ? action.payload : link)
            }
        case FETCH_LINKS:
            return {
                loading: true,
                ...state
            }
        case FETCH_LINKS_SUCCESS:
            return {
                loading: false,
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}




export default linksReducer;

