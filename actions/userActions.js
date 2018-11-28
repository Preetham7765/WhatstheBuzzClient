import axios from 'axios';
import { GET_USER, ADD_USER, DELETE_USER, USER_LOADING} from './types';
import {SERVER_URL, PROD_URL} from "../constants/Config";

export const getUser = (id) => dispatch => {
    dispatch(setUserLoading());
    const url = PROD_URL+'users/'+id;
    console.log('url: ' + url);
    axios.get(url).then(res => {
        console.log('id'+id);
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    }).catch(error => {
        console.log(error);
    });
};

export const deleteUser = (id) => dispatch => {
    axios.delete(`${SERVER_URL}/api/users/${id}`).then(res =>
        dispatch({
            type: DELETE_USER,
            payload: id
        })
    );
};


export const addUser = (user) => dispatch => {
    axios.post(`${SERVER_URL}/api/users/${id}`, user).then(res =>
        dispatch({
            type: ADD_USER,
            payload: res.data
        })
    );
};

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};