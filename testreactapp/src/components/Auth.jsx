import React from 'react';

const REDIRECT_URI = "http://localhost:3000";

export default class Auth extends React.Component {

constructor(props){
    super(props);
}

    render(){
        const {clientId} = this.props;//destructor
        return(
            <div className="formLoginContainer">
                <div className="h2">
                    <h2>Sign In</h2>
                </div>
                <form className="loginForm">
                    <div className ="buttonContainer">
                        <div>
                            <a /*style={{display: this.state.oAuthStatus === "Not Loaded" ? "inline" : "none" }}*/ href={`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user&redirect_uri=${REDIRECT_URI}`}>Logg In</a>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

