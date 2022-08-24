import { EDIT_PROFILE } from "./profileTypes";

const initialState = {
    loading: true,
    data: {},
    error: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_PROFILE:
            return {
                ...state,
                loading:false,
                data: action.payload
            }
        default:
            return state;
    }
}

export default profileReducer;