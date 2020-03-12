import React from 'react';
import './index.css';
import './styles.css';
import Auth from './components/Auth';
import UserInfo from './components/UserInfo';
import ReposDashboard from './components/ReposDashboard';





export default class App extends React.Component {

    constructor(props) {
        super(props);
    }



    render(){
        /*const deleteBtn = <div>
        <button  className="deleteAuth" onClick={(event) => this.deleteOAuth(event,this.state.token, clientId)}>Logg Out</button> 
        </div>*/
        const {user,userRepositories,clientId,userFetchRequested,userRepositoriesFetchRequested} = this.props;//destructor
        return (
            <div className="root">
                <div className="mainComponent">
                    <Auth clientId={clientId}/>
                    <UserInfo userRepositoriesFetchRequested={userRepositoriesFetchRequested} userFetchRequested={userFetchRequested} user={user} userRepositories={userRepositories}/>
                    <ReposDashboard/>
                </div>
            </div>
        );
    }
  }