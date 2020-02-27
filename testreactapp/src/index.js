import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Provider,connect} from 'react-redux';
import {createStore,bindActionCreators} from 'redux';

//initial component states for reduser
const initialState ={
    login: 'incognito',
    password: '101010'
  };
  
//action types  
const ACTION_CHANGE_LOGIN ='ACTION_CHANGE_LOGIN';
const ACTION_CHANGE_PASSWORD = 'ACTION_CHANGE_PASSWORD';
  
  /*const actionChangeLogin = {
    type: ACTION_CHANGE_LOGIN,
    payload:null
  }*/
  
  /*const actionChangePassword = {
    type: ACTION_CHANGE_PASSWORD,
    payload:null
  }*/

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
  
    
//reducer that get store in argument and return store as result
//??He can be called every moment after component rendered(ComponentDidMount()) and search wich action is happend
//??after this he change components state in such cases:D 
const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case ACTION_CHANGE_LOGIN:
            return {...state, login: action.payload};//saves previous states with new values
        case ACTION_CHANGE_PASSWORD:
            return {...state, password: action.payload};//saves previous states with new values
    }
    return state
}
  
  //STORE
const store = createStore(rootReducer);
  
console.log(store.getState());
  
export default class App extends React.Component {
    render(){
        console.log(this.props)
        //const dispatch = this.props.dispatch;
        const {login,password,changeLogin,changePassword} = this.props;//destructor
        return (
            <div className="auth">
            <h2>Sign In</h2>
            <form>
                <div>
                <input type="text" onChange={(event) => {/*dispatch(changeLogin(event.target.value))*/changeLogin(event.target.value)}} value={login} name="login" placeholder="E-mail"/>
                </div>
                <div>
                <input type="password" onChange={(event) => {/*dispatch(changePassword(event.target.value))*/changePassword(event.target.value)}} value={password} name="password" placeholder="Password"/>
                </div>
                <div>
                <button>Sign In</button>
                </div>
                <div>
                    Login: <b>{login}</b> Password: <b>{password}</b>
                </div>
            </form>
            </div>
        );
    }
  
  }
  
//Wrapper  
//Steal values from state and add them to properties(props)  
const putStateToProps = (state) =>{
    console.log(state);
    return{
        login: state.login,
        password: state.password
    };
};

//Wrapper  
//Link dispatch functions to properties(props)
const putActionsToProps = (dispatch) => {
    return{
        changeLogin: bindActionCreators(changeLogin, dispatch),
        changePassword: bindActionCreators(changePassword, dispatch)
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
