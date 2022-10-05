import axios from "axios";
import { ADD_SPONSER } from "./sponsersType";
import { DELETE_SPONSER } from "./sponsersType";
import { EDIT_SPONSER } from "./sponsersType";
import { FETCH_SPONSERS } from "./sponsersType";
import { FETCH_SPONSERS_SUCCESS } from "./sponsersType";
import {UPDATE_SPONSERS_ORDER} from "./sponsersType";
import {base_URL} from '../';

export function addSponser(sponser) {
  return {
    type: ADD_SPONSER,
    payload:sponser
  };
}
export function deleteSponser(id) {
    return {
        type: DELETE_SPONSER,
        payload:id
    };
}
export function editSponser(sponser) {
    return {
        type: EDIT_SPONSER,
        payload:sponser
    };
}
export function fetchSponsers(sponsers) {
    return {
        type: FETCH_SPONSERS,
    };
}
export function fetchSponsersSuccess(sponsers) {
    return {
        type: FETCH_SPONSERS_SUCCESS,
        payload:sponsers
    };
}
export function updateSponsersOrder(sponsers) {
    return {
        type: UPDATE_SPONSERS_ORDER,
        payload:sponsers
    };
}

export const fetchSponsersFromState = (sponsers)=>{
    return function(dispatch){
        dispatch(fetchSponsers());
        dispatch(fetchSponsersSuccess(sponsers));
        
    }
}

export const updateSponser = (sponser)=>{
    return function(dispatch){
        axios.post(base_URL+'/sponsers/updateSponser', sponser ,{ withCredentials: true, headers:{'Access-Control-Allow-Origin':'localhost:3000'} })
            .then(res => {
                console.log(res);
            }
        );
    }
}
export const updateSponsersOrderDB = (sponsers)=>{
    return function(dispatch){
        axios.post(base_URL+'/sponsers/updateSponsersOrder', sponsers ,{ withCredentials: true, headers:{'Access-Control-Allow-Origin':'localhost:3000'} })
            .then(res => {
                console.log(res);
                dispatch(updateSponsersOrder(sponsers));
            }
        );
    }
}


export const addNewSponserInDb = (sponser)=>{
    return function(dispatch){
        axios.post(base_URL+'/sponsers/addSponser', sponser ,{ withCredentials: true, headers:{'Access-Control-Allow-Origin':'localhost:3000'} })
            .then(res => {
                console.log(res);
            }
        );
    }
}

export const deleteSponserInDb = (id)=>{
    console.log(id);
    return function(dispatch){
        axios.post(base_URL+'/sponsers/deleteSponser', {id:id} ,{ withCredentials: true, headers:{'Access-Control-Allow-Origin':'localhost:3000'} })
            .then(res => {
                console.log(res);
            }
        );
    }
}
