/*import React from 'react';
import ReactDOM from 'react-dom';

export default class UserInfo extends React.Component () {
    render() {
        const {globalRepositoriesList,isLoaded, token} = this.state;
        const {pressedSignInButton,user,userRepositories,clientId} = this.props;//destructor
        return(
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
        )
    }
}*/