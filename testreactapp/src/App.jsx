import React from 'react';
import './index.css';
import './styles.css';
import Auth from './components/Auth/Auth';
import UserInfo from './components/UserInfo/UserInfo';
import ReposDashboard from './components/ReposDashboard/ReposDashboard';
import {AppStyle} from './AppStyle';


export default class App extends React.Component {

    constructor(props) {
        super(props);
    }



    render(){
        const {userToken,loadingStatus,user,userRepositories,clientId,userFetchRequested,userRepositoriesFetchRequested, newTokenStatus, userTokenCatched} = this.props;//destructor
        return (
            <div className="root">
                <AppStyle>
                    <Auth clientId={clientId} userToken={userToken} loadingStatus={loadingStatus}/>
                    <UserInfo userRepositoriesFetchRequested={userRepositoriesFetchRequested} userFetchRequested={userFetchRequested} user={user} userRepositories={userRepositories} newTokenStatus={newTokenStatus} userTokenCatched={userTokenCatched}/>
                    <ReposDashboard/>
                </AppStyle>
            </div>
        );
    }
  }