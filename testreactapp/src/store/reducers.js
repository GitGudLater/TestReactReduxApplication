import { ACTION_CATCHED_USER_PROFILE, ACTION_CATCHED_REPOSITORIES, ACTION_CATCHED_GLOBAL_REPOSITORIES, ACTION_PRESS_SIGNIN_BUTTON, ACTION_USER_FETCH_REQUESTED, ACTION_USER_REPOSITORIES_FETCH_REQUESTED, ACTION_CATCHED_USER_TOKEN, ACTION_USER_TOKEN_STATUS, ACTION_NEW_TOKEN_STATUS, ACTION_SET_USER_TOKEN } from "./actions";
import { combineReducers } from 'redux';

const initialState ={
    user: {
        name: "",
        avatar_url: ""
    },
    clientId: "f881151bded22e6488b8",
    clientSecret: "2a276748cf9e94e43cc3cc0f3c61281f73549dc8",
    userRepositories: [{name:"undefined"}],
    userToken:{},
    loadingStatus:"Not Loaded"
};

export  const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case ACTION_NEW_TOKEN_STATUS:
            return {...state};
        case ACTION_USER_TOKEN_STATUS:
            return {...state, loadingStatus: action.payload};
        case ACTION_CATCHED_USER_TOKEN:
            return {...state};
        case ACTION_SET_USER_TOKEN:
            return {...state, userToken: action.payload};    
        case ACTION_CATCHED_USER_PROFILE:
            return {...state, user: action.payload};
        case ACTION_CATCHED_REPOSITORIES:
            return {...state, userRepositories:action.payload};
        case ACTION_CATCHED_GLOBAL_REPOSITORIES:
            return {...state, globalRepositoriesList:action.payload};
        case ACTION_PRESS_SIGNIN_BUTTON:
            return {...state};
        case ACTION_USER_FETCH_REQUESTED:
            return {...state};
        case ACTION_USER_REPOSITORIES_FETCH_REQUESTED:
            return {...state};
    }
    return state
}