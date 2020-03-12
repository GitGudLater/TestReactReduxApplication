import { ACTION_USER_FETCH_REQUESTED, ACTION_USER_REPOSITORIES_FETCH_REQUESTED,verrifiedUser, loadedRepositories, ACTION_CATCHED_USER_TOKEN, ACTION_NEW_TOKEN_STATUS, userTokenSet, userTokenStatus } from './actions';
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

function* putUserToken(action){
    yield put(userTokenSet(action.payload));
}

function* changeTokenLoadingStatus(action){
    yield put(userTokenStatus(action.payload));
}


function* userSaga() {
    yield takeEvery(ACTION_USER_FETCH_REQUESTED, fetchUser);
  }

  function* userReposSaga() {
    yield takeEvery(ACTION_USER_REPOSITORIES_FETCH_REQUESTED,fetchUserRepositories);
  }

  function* userTokenSaga() {
    yield takeEvery(ACTION_CATCHED_USER_TOKEN,putUserToken);
  }

  function* userTokenStatusSaga() {
    yield takeEvery(ACTION_NEW_TOKEN_STATUS,changeTokenLoadingStatus) ;
  }

export function* rootSaga() {
    yield all([
      userSaga(),
      userReposSaga(),
      userTokenSaga(),
      userTokenStatusSaga()
    ])
  }