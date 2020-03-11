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


const REDIRECT_URI = "http://localhost:3000";

//initial component states for reduser
const initialState ={
    user: {
        name: "",
        avatar_url: ""
    },
    clientId: "f881151bded22e6488b8",
    clientSecret: "2a276748cf9e94e43cc3cc0f3c61281f73549dc8",
    userRepositories: [{name:"undefined"}],
  };
  
//action types  
const ACTION_CATCHED_USER_PROFILE = 'ACTION_CATCHED_USER_PROFILE';
const ACTION_CATCHED_REPOSITORIES = 'ACTION_CATCHED_REPOSITORIES';
const ACTION_CATCHED_GLOBAL_REPOSITORIES = 'ACTION_CATCHED_GLOBAL_REPOSITORIES';
const ACTION_PRESS_SIGNIN_BUTTON = 'ACTION_PRESS_SIGNIN_BUTTON';
const ACTION_USER_FETCH_REQUESTED = 'ACTION_USER_FETCH_REQUESTED';
const ACTION_USER_REPOSITORIES_FETCH_REQUESTED = 'ACTION_USER_REPOSITORIES_FETCH_REQUESTED';


//wrapper action
const userRepositoriesFetchRequested = (token) =>{
    return{
        type: ACTION_USER_REPOSITORIES_FETCH_REQUESTED,
        payload: token
        };
    };


//wrapper action
const userFetchRequested = (token) =>{
    return{
        type: ACTION_USER_FETCH_REQUESTED,
        payload: token
        };
    };


//wrapper action
const pressedSignInButton = () =>{
    return{
        type: ACTION_PRESS_SIGNIN_BUTTON,
        payload: null
        };
    };


//wrapper action
const loadedGlobalRepositories = (repositories) =>{
    return{
        type: ACTION_CATCHED_GLOBAL_REPOSITORIES,
        payload: repositories
        };
    };




  

//wrapped action    
const verrifiedUser = (user) =>{
    return{
        type: ACTION_CATCHED_USER_PROFILE,
        payload: user
        };
    };

//wrapped action    
const loadedRepositories = (repositories) =>{
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
  
//Saga middle-ware layer
const sagaMiddleware = createSagaMiddleware();

//STORE
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
  

  
function* fetchUser(action) {
    const result =yield axios({  method: 'get',url: 'https://api.github.com/user',headers:{'Authorization': `token ${action.payload.token}`}}/*`https://api.github.com/users/${action.payload}`*/).then(response => response.data);
    yield put(verrifiedUser(result));
 }

function* fetchUserRepositories(action) {
    const result =yield axios({  method: 'get',url: 'https://api.github.com/user/repos',headers:{'Authorization': `token ${action.payload.token}`}}).then(response => response.data);
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
        );
        
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
        //console.log(this.props)
        //const dispatch = this.props.dispatch;
        /*const deleteBtn = <div>
        <button  className="deleteAuth" onClick={(event) => this.deleteOAuth(event,this.state.token, clientId)}>Logg Out</button> 
        </div>*/
        const {globalRepositoriesList,isLoaded, token} = this.state;
        const {pressedSignInButton,user,userRepositories,clientId} = this.props;//destructor
        const globalList = isLoaded ? 
        <ul className="topTierList">
            {globalRepositoriesList.items.map(item => (
                <li className="topTierListElement"  key={item.name}>
                    Repository '{item.name}' created by owner {item.owner.login}
                </li>
            ))}
        </ul> : "loading..." ;
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
