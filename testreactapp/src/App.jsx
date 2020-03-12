import React from 'react';
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



const REDIRECT_URI = "http://localhost:3000";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.catchUserProfile = this.catchUserProfile.bind(this);
        this.deleteOAuth = this.deleteOAuth.bind(this);
        this.state = {
            globalRepositoriesList: null,
            isLoaded: false,
            oAuthStatus: 'Not Loaded',
            token: null
        }
    }


    catchUserProfile(e,token) {
        const { userRepositoriesFetchRequested,userFetchRequested} = this.props;
        e.preventDefault();
        userFetchRequested(token);
        userRepositoriesFetchRequested(token);

    };

    deleteOAuth(event , token, clientId) {
        event.preventDefault();
        axios.delete(`https://api.github.com/application/${clientId}/grant`,token)
    }

    componentDidUpdate(){
        console.log(this.state.token);
    }

    componentDidMount(){
        const code = window.location.href.match(/\?code=(.*)/) && window.location.href.match(/\?code=(.*)/)[1];
        if(code){
            this.setState({ oAuthStatus:"In progress" });
            axios.get(`https://simple-o-auth.herokuapp.com/authenticate/${code}`)
                .then(userToken => this.setState(
                    {
                        token:userToken.data,
                        oAuthStatus: 'Loaded',
                    }
                )
            )
        }
    }


    render(){
        /*const deleteBtn = <div>
        <button  className="deleteAuth" onClick={(event) => this.deleteOAuth(event,this.state.token, clientId)}>Logg Out</button> 
        </div>*/
        const {token} = this.state;
        const {pressedSignInButton,user,userRepositories,clientId} = this.props;//destructor
        return (
            <div className="root">
                <div className="mainComponent">
                    <div className="formLoginContainer">
                        <div className="h2">
                            <h2>Sign In</h2>
                        </div>
                        <form className="loginForm">
                            <div className ="buttonContainer">
                                <div>
                                    <a style={{display: this.state.oAuthStatus === "Not Loaded" ? "inline" : "none" }} href={`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user&redirect_uri=${REDIRECT_URI}`} onClick={pressedSignInButton}>Logg In</a>
                                </div>
                                <div>
                                    <button className="getUserInfo" onClick={(event)=>this.catchUserProfile(event, token)}>Get Info</button>
                                </div>
                            </div>
                            <div className="userInfoContainer">
                                <div className="userNameContainer">
                                    {user.name}
                                </div>
                                <div className="userAvatarContainer">
                                    <img src={user.avatar_url}/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="userRepositoriesContainer">
                        Repositories that this person owned
                        <ul className = "userRepositoriesList">
                            {userRepositories.map(item => (
                                <li className = "userRepositoriesListElement" key={item.name}>
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <ReposDashboard/>
                </div>
            </div>
        );
    }
  }