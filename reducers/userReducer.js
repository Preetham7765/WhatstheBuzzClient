import {
    GET_USER,
    ADD_USER,
    DELETE_USER,
    GET_REP,
    USER_LOADING
} from '../actions/types';

const initialState = {
    user: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            };
        case GET_REP:
            return {
                ...state,
                user: action.payload,
                loading: false
            };
        case DELETE_USER:
            return {
                ...state,
                user: state.user.filter(user => user._id !== action.payload)
            };
        case ADD_USER:
            return {
                ...state,
                user: [action.payload, ...state.user]
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}