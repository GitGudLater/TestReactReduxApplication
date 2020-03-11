import { ACTION_CATCHED_USER_PROFILE, ACTION_CATCHED_REPOSITORIES, ACTION_CATCHED_GLOBAL_REPOSITORIES, ACTION_PRESS_SIGNIN_BUTTON, ACTION_USER_FETCH_REQUESTED, ACTION_USER_REPOSITORIES_FETCH_REQUESTED,verrifiedUser, loadedRepositories,loadedGlobalRepositories,pressedSignInButton,userFetchRequested,userRepositoriesFetchRequested } from './actions';
import { all ,call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


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


export function* rootSaga() {
    yield all([
      userSaga(),
      userReposSaga()
    ])
  }