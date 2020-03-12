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
        const {userToken,loadingStatus,user,userRepositories,clientId,userFetchRequested,userRepositoriesFetchRequested, newTokenStatus, userTokenCatched} = this.props;//destructor
        return (
            <div className="root">
                <div className="mainComponent">
                    <Auth clientId={clientId} userToken={userToken} loadingStatus={loadingStatus}/>
                    <UserInfo userRepositoriesFetchRequested={userRepositoriesFetchRequested} userFetchRequested={userFetchRequested} user={user} userRepositories={userRepositories} newTokenStatus={newTokenStatus} userTokenCatched={userTokenCatched}/>
                    <ReposDashboard/>
                </div>
            </div>
        );
    }
  }