import React from 'react';
import axios from 'axios';



export default class UserInfo extends React.Component{


    constructor(props){
        super(props);
        this.catchUserProfile = this.catchUserProfile.bind(this);
        this.state = {
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

    componentDidUpdate(){
        const {newTokenStatus, userTokenCatched} = this.props;
        console.log(this.state.token);
        newTokenStatus(this.state.oAuthStatus);
        userTokenCatched(this.state.token);
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

    render() {
        const {token} = this.state;
        const {user,userRepositories} = this.props;//destructor
        return(
            <div className="userRepositoriesContainer">
                <div>
                    <button className="getUserInfo" onClick={(event)=>this.catchUserProfile(event, token)}>Get Info</button>
                </div>
                <div className="userInfoContainer">
                    <div className="userNameContainer">
                        {user.name}
                    </div>
                    <div className="userAvatarContainer">
                        <img src={user.avatar_url}/>
                    </div>
                </div>
                Repositories that this person owned
                <ul className = "userRepositoriesList">
                    {userRepositories.map(item => (
                        <li className = "userRepositoriesListElement" key={item.name}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>            
        )
    }
}

