/*import React from 'react';
import ReactDOM from 'react-dom';

const REDIRECT_URI = "http://localhost:3000";

export default class Auth extends React.Component() {

    constructor(props){
        super(props);
        this.catchUserProfile = this.catchUserProfile.bind(this);
        
    }

    catchUserProfile(e,token) {
        const { userRepositoriesFetchRequested,userFetchRequested} = this.props;
        e.preventDefault();
        userFetchRequested(token);
        userRepositoriesFetchRequested(token);

    };

    render() {
        const {globalRepositoriesList,isLoaded, token} = this.state;
        const {pressedSignInButton,user,userRepositories,clientId} = this.props;//destructor
        return(
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
        )
    }
}*/