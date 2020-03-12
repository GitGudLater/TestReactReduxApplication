import React from 'react';

const REDIRECT_URI = "http://localhost:3000";

export default class Auth extends React.Component {

constructor(props){
    super(props);
}

    render(){
        const {clientId,loadingStatus} = this.props;//destructor
        return(
            <div className="formLoginContainer">
                <div className="h2">
                    <h2>Sign In</h2>
                </div>
                <form className="loginForm">
                    <div className ="buttonContainer">
                        <div>
                            <a style={{display: loadingStatus === "Not Loaded" ? "inline" : "none" }} href={`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user&redirect_uri=${REDIRECT_URI}`}>Logg In</a>
                            <p style={{display: loadingStatus === "Loaded" ? "inline" : "none" }}>Authorization and authentification complete</p>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

