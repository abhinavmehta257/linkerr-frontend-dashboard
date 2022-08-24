import { combineReducers } from "redux";
import dataReducer from "./data/dataRedusers";
import linksReducer from "./links/linksReducer";
import profileReducer from "./profile/profileRedusers";
import authReducer from "./auth/authRedusers";
import sponsersReducer from "./sponser/sponserReducer";
import themesReducer from "./themes/themesRedusers";

const rootReducer =  combineReducers({
    data: dataReducer,
    links: linksReducer,
    profile: profileReducer,
    auth: authReducer,
    sponsers: sponsersReducer,
    themes : themesReducer
});

export default rootReducer;