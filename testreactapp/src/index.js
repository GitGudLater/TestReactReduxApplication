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



//initial component states for reduser
const initialState ={
    login: '',
    password: '',
    user: {
        name: "",
        avatar_url: ""
        /*login: " ",
        id: 0,
        node_id: "0",
        avatar_url: "0",
        "gravatar_id": "",
        "url": "0",
        "html_url": "0",
        "followers_url": "0",
        "following_url": "0",
        "gists_url": "0",
        "starred_url": "0",
        "subscriptions_url": "0",
        "organizations_url": "0",
        "repos_url": "0",
        "events_url": "0",
        "received_events_url": "0",
        "type": "0",
        "site_admin": false,
        "name": "0",
        "company": null,
        "blog": "0",
        "location": "0",
        "email": null,
        "hireable": null,
        "bio": null,
        "public_repos": 67,
        "public_gists": 27,
        "followers": 54,
        "following": 30,
        "created_at": "2010-08-28T22:13:36Z",
        "updated_at": "2020-03-02T10:48:15Z"*/
    },
    userSecret: {secret:" "},
    userToken: {token: " "},
    isLoaded: false,
    userRepositories: [{name:"undefined"}],
    globalRepositoriesList: [{name:"undefined"}]
  };
  
//action types  
const ACTION_CHANGE_LOGIN ='ACTION_CHANGE_LOGIN';
const ACTION_CHANGE_PASSWORD = 'ACTION_CHANGE_PASSWORD';
const ACTION_CATCHED_USER_PROFILE = 'ACTION_CATCHED_USER_PROFILE';
const ACTION_CATCHED_REPOSITORIES = 'ACTION_CATCHED_REPOSITORIES';
const ACTION_CATCHED_USER_TOKEN = 'ACTION_CATCHED_USER_TOKEN';
const ACTION_CATCHED_GLOBAL_REPOSITORIES = 'ACTION_CATCHED_GLOBAL_REPOSITORIES';
const ACTION_PRESS_SIGNIN_BUTTON = 'ACTION_PRESS_SIGNIN_BUTTON';
const ACTION_USER_FETCH_REQUESTED = 'ACTION_USER_FETCH_REQUESTED';
const ACTION_USER_REPOSITORIES_FETCH_REQUESTED = 'ACTION_USER_REPOSITORIES_FETCH_REQUESTED';


  //simple purrified actions
  /*const actionChangeLogin = {
    type: ACTION_CHANGE_LOGIN,
    payload:null
  }*/
  
  /*const actionChangePassword = {
    type: ACTION_CHANGE_PASSWORD,
    payload:null
  }*/


//wrapper action
const userRepositoriesFetchRequested = (userLogin) =>{
    //console.log(repositories);
    return{
        type: ACTION_USER_REPOSITORIES_FETCH_REQUESTED,
        payload: userLogin
        };
    };


//wrapper action
const userFetchRequested = (userLogin) =>{
    //console.log(repositories);
    return{
        type: ACTION_USER_FETCH_REQUESTED,
        payload: userLogin
        };
    };


//wrapper action
const pressedSignInButton = () =>{
    //console.log(repositories);
    return{
        type: ACTION_PRESS_SIGNIN_BUTTON,
        payload: null
        };
    };


//wrapper action
const loadedGlobalRepositories = (repositories) =>{
    //console.log(repositories);
    return{
        type: ACTION_CATCHED_GLOBAL_REPOSITORIES,
        payload: repositories
        };
    };

//wrapped action  
const catchedUserToken = (token) =>{
    //console.log(token);
    return{
        type: ACTION_CATCHED_USER_TOKEN,
        payload:token
        };
    };


//wrapped action  
const changeLogin = (newLogin) =>{
    //console.log(newLogin);
    return{
        type: ACTION_CHANGE_LOGIN,
        payload:newLogin
        };
    };


//wrapped action    
const changePassword = (newPassword) =>{
    //console.log(newPassword);
    return{
        type: ACTION_CHANGE_PASSWORD,
        payload:newPassword
        };
    };
  

//wrapped action    
const verrifiedUser = (user) =>{
    //console.log(user);
    return{
        type: ACTION_CATCHED_USER_PROFILE,
        payload: user
        };
    };


const loadedRepositories = (repositories) =>{
    //console.log(repositories);
    return{
        type: ACTION_CATCHED_REPOSITORIES,
        payload: repositories
        };
    };
    
//reducer that get store in argument and return store as result
//??He can be called every moment after component rendered(ComponentDidMount()/DidUpdate()) and search wich action is happend
//??after this he change components state in such cases:D 
const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case ACTION_CHANGE_LOGIN:
            return {...state, login: action.payload};//saves previous states with new values
        case ACTION_CHANGE_PASSWORD:
            return {...state, password: action.payload};//saves previous states with new values
        case ACTION_CATCHED_USER_PROFILE:
            return {...state, user: action.payload};
        case ACTION_CATCHED_REPOSITORIES:
            return {...state, userRepositories:action.payload};
        case ACTION_CATCHED_USER_TOKEN:
            return {...state, userToken:action.payload};
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
  
//Saga middle-ware layer
const sagaMiddleware = createSagaMiddleware();


  //STORE
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
  

  
function* fetchUser(action) {
    const result =yield axios.get(`https://api.github.com/users/${action.payload}`).then(response => response.data);
    yield put(verrifiedUser(result));
 }

function* fetchUserRepositories(action) {
    const result =yield axios.get(`https://api.github.com/users/${action.payload}/repos`).then(response => response.data);
    yield put(loadedRepositories(result));
}


function* userSaga() {
    yield takeEvery(ACTION_USER_FETCH_REQUESTED, fetchUser);
  }

  function* userReposSaga() {
    yield takeEvery(ACTION_USER_REPOSITORIES_FETCH_REQUESTED,fetchUserRepositories)
  }


function* rootSaga() {
    yield all([
      userSaga(),
      userReposSaga()
    ])
  }


export default class App extends React.Component {
    
    

    constructor(props) {
        super(props);
        this.catchUserProfile = this.catchUserProfile.bind(this);
        this.state = {
            globalRepositoriesList: null,
            isLoaded: false
        }
    }

    catchUserToken(e,userLogin,userPassword){
        const {pressedSignInButton} = this.props;
        e.preventDefault();
        //fetch();
        pressedSignInButton();
        alert(`user token request for user ${userLogin} with password ${userPassword} will be added soon with fetch function`);
    }

    catchUserProfile(e,userLogin) {
        const { userRepositoriesFetchRequested,userFetchRequested} = this.props;
        e.preventDefault();
        userFetchRequested(userLogin);
        userRepositoriesFetchRequested(userLogin);

    };



    componentDidMount(){

        axios.get(`https://api.github.com/search/repositories?q=stars:>=500&sort=stars&order=desc`)
        .then(
            result => {
                this.setState(
                    {
                        globalRepositoriesList: result.data,
                        isLoaded:true
                    }
                )
            }
        )
    }


    render(){
        //console.log(this.props)
        //const dispatch = this.props.dispatch;
        const {globalRepositoriesList,isLoaded} = this.state;
        const {login,password,changeLogin,changePassword,user,userRepositories/*, globalRepositoriesList*/} = this.props;//destructor
        const globalList = isLoaded ? 
        <ul className="topTierList">
            {globalRepositoriesList.items.map(item => (
                <li className="topTierListElement"  key={item.name}>
                    Repository '{item.name}' created by owner {item.owner.login}
                </li>
            ))}
        </ul> : "loading..." ;
        //console.log(this.state);
        return (
            <div className="root">
                <div className="mainComponent">
                    <div className="formLoginContainer">
                        <div className="h2">
                            <h2>Sign In</h2>
                        </div>
                        <form className="loginForm">
                            <div className="inputContainer">
                                <input type="text" onChange={(event) => {/*dispatch(changeLogin(event.target.value))*/changeLogin(event.target.value)}} value={login} name="login" placeholder="login"/>
                            </div>
                            <div className="inputContainer">
                                <input type="password" onChange={(event) => {/*dispatch(changePassword(event.target.value))*/changePassword(event.target.value)}} value={password} name="password" placeholder="Password"/>
                            </div>
                            <div className ="buttonContainer">
                                <div>
                                    <button className="loggIn" onClick={(event) => this.catchUserToken(event,login,password)}>Sign In</button>
                                </div>
                                <div>
                                    <button className="getUserInfo" onClick={(event)=>this.catchUserProfile(event,login)}>Get Info</button>
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
                    <div className="topTierRepositoriesContainer">
                        Top tier of repositories with highest numbers of stars
                        {globalList}
                    </div>
                </div>
            </div>
            
            
        );

    }
  
  }
  
//Wrapper  
//Steal values from state and add them to properties(props)  
const putStateToProps = (state) =>{
    //console.log(state);
    return{
        login: state.login,
        password: state.password,
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
        changeLogin: bindActionCreators(changeLogin, dispatch),
        changePassword: bindActionCreators(changePassword, dispatch),
        verrifiedUser: bindActionCreators(verrifiedUser, dispatch),
        loadedRepositories: bindActionCreators(loadedRepositories, dispatch),
        catchedUserToken: bindActionCreators(catchedUserToken, dispatch),
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
