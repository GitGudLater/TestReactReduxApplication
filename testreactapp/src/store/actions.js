//action types  
export const ACTION_CATCHED_USER_PROFILE = 'ACTION_CATCHED_USER_PROFILE';
export const ACTION_CATCHED_REPOSITORIES = 'ACTION_CATCHED_REPOSITORIES';
export const ACTION_CATCHED_GLOBAL_REPOSITORIES = 'ACTION_CATCHED_GLOBAL_REPOSITORIES';
export const ACTION_CATCHED_USER_TOKEN ='ACTION_CATCHED_USER_TOKEN';
export const ACTION_PRESS_SIGNIN_BUTTON = 'ACTION_PRESS_SIGNIN_BUTTON';
export const ACTION_USER_FETCH_REQUESTED = 'ACTION_USER_FETCH_REQUESTED';
export const ACTION_USER_REPOSITORIES_FETCH_REQUESTED = 'ACTION_USER_REPOSITORIES_FETCH_REQUESTED';
export const ACTION_USER_TOKEN_STATUS = 'ACTION_USER_TOKEN_STATUS';
export const ACTION_NEW_TOKEN_STATUS = 'ACTION_NEW_TOKEN_STATUS';
export const ACTION_SET_USER_TOKEN = 'ACTION_SET_USER_TOKEN';


//wrapper action
export const userTokenSet = (token) =>{
    return{
        type: ACTION_SET_USER_TOKEN,
        payload: token
        };
    };

//wrapper action
export const newTokenStatus = (loadingStatus) =>{
    return{
        type: ACTION_NEW_TOKEN_STATUS,
        payload: loadingStatus
        };
    };

//wrapper action
export const userTokenStatus = (loadingStatus) =>{
    return{
        type: ACTION_USER_TOKEN_STATUS,
        payload: loadingStatus
        };
    };

//wrapper action
export const userTokenCatched = (token) =>{
    return{
        type: ACTION_CATCHED_USER_TOKEN,
        payload: token
        };
    };

//wrapper action
export const userRepositoriesFetchRequested = (token) =>{
    return{
        type: ACTION_USER_REPOSITORIES_FETCH_REQUESTED,
        payload: token
        };
    };

//wrapper action
export const userFetchRequested = (token) =>{
    return{
        type: ACTION_USER_FETCH_REQUESTED,
        payload: token
        };
    };

//wrapper action
export const pressedSignInButton = () =>{
    return{
        type: ACTION_PRESS_SIGNIN_BUTTON,
        payload: null
        };
    };

//wrapper action
export const loadedGlobalRepositories = (repositories) =>{
    return{
        type: ACTION_CATCHED_GLOBAL_REPOSITORIES,
        payload: repositories
        };
    };

//wrapped action    
export const verrifiedUser = (user) =>{
    return{
        type: ACTION_CATCHED_USER_PROFILE,
        payload: user
        };
    };

//wrapped action    
export const loadedRepositories = (repositories) =>{
    return{
        type: ACTION_CATCHED_REPOSITORIES,
        payload: repositories
        };
    };