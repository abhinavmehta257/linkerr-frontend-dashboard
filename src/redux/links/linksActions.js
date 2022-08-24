import axios from "axios";
import { ADD_LINK } from "./linksType";
import { DELETE_LINK } from "./linksType";
import { EDIT_LINK } from "./linksType";
import { FETCH_LINKS } from "./linksType";
import { FETCH_LINKS_SUCCESS } from "./linksType";
import {base_URL} from '../';

export function addLink(link) {
  return {
    type: ADD_LINK,
    payload:link
  };
}
export function deleteLink(id) {
    return {
        type: DELETE_LINK,
        payload:id
    };
}
export function editLink(link) {
    return {
        type: EDIT_LINK,
        payload:link
    };
}
export function fetchLinks(links) {
    return {
        type: FETCH_LINKS,
    };
}
export function fetchLinksSuccess(links) {
    return {
        type: FETCH_LINKS_SUCCESS,
        payload:links
    };
}


export const fetchLinksFromState = (links)=>{
    return function(dispatch){
        dispatch(fetchLinks());
        dispatch(fetchLinksSuccess(links));
        
    }
}

export const updateLink = (link)=>{
    return function(dispatch){
        axios.post(base_URL+'/links/updateLink', link ,{ withCredentials: true })
            .then(res => {
                console.log(res);
            }
        );
    }
}

export const addNewLinkInDb = (link)=>{
    return function(dispatch){
        axios.post(base_URL+'/links/addLink', link ,{ withCredentials: true })
            .then(res => {
                console.log(res);
            }
        );
    }
}

export const deleteLinkInDb = (id)=>{
    return function(dispatch){
        axios.post(base_URL+'/links/deleteLink', {id:id} ,{ withCredentials: true })
            .then(res => {
                console.log(res);
            }
        );
    }
}
