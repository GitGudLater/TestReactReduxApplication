import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import './styles.css';
import * as serviceWorker from './serviceWorker';
import {Provider,connect} from 'react-redux';
import {createStore,bindActionCreators,applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all ,call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { composeWithDevTools } from 'redux-devtools-extension';
import Auth from './components/Auth';
import UserInfo from './components/UserInfo';
import ReposDashboard from './components/ReposDashboard';
import { rootReducer } from './store/reducers';
import { ACTION_CATCHED_USER_PROFILE, ACTION_CATCHED_REPOSITORIES, ACTION_CATCHED_GLOBAL_REPOSITORIES, ACTION_PRESS_SIGNIN_BUTTON, ACTION_USER_FETCH_REQUESTED, ACTION_USER_REPOSITORIES_FETCH_REQUESTED,verrifiedUser, loadedRepositories,loadedGlobalRepositories,pressedSignInButton,userFetchRequested,userRepositoriesFetchRequested } from "./store/actions";
import {rootSaga} from './store/saga';
import App from './App';

const REDIRECT_URI = "http://localhost:3000";



//Saga middle-ware layer
const sagaMiddleware = createSagaMiddleware();

//STORE
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(sagaMiddleware)));

//initial saga
sagaMiddleware.run(rootSaga); 
  
//Wrapper  
//Steal values from state and add them to properties(props)  
const putStateToProps = (state) =>{
    //console.log(state);
    return{
        clientId:state.clientId,
        user: state.user,
        isLoaded: state.isLoaded,
        userRepositories: state.userRepositories,
        userToken: state.userToken,
        globalRepositoriesList: state.globalRepositoriesList
    };
};



//Wrapper  
//Link dispatch functions to properties(props)
const putActionsToProps = (dispatch) => {
    return{
        verrifiedUser: bindActionCreators(verrifiedUser, dispatch),
        loadedRepositories: bindActionCreators(loadedRepositories, dispatch),
        loadedGlobalRepositories: bindActionCreators(loadedGlobalRepositories, dispatch),
        pressedSignInButton: bindActionCreators(pressedSignInButton, dispatch),
        userFetchRequested: bindActionCreators(userFetchRequested, dispatch),
        userRepositoriesFetchRequested: bindActionCreators(userRepositoriesFetchRequested, dispatch)
    };
};

//Wrapper  
//Combine main component and wrappers to create a new component with wrappers functions
const WrappedAppComponent = connect(putStateToProps,putActionsToProps)(App);

ReactDOM.render(/*Put store to props*/<Provider store={store}><WrappedAppComponent /></Provider>/*<App/>*/ , document.getElementById('root'));












// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
