import { take, call, select, fork, put } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import {config} from '../config.js';
import {CONFIG , CONFIG_COMPLETE , AUTHENTICATE} from '../types';
import request from '../utils/request';

// for loading config 
export function* fetch(action) {
  console.log('Root saga invoked');
	yield put(createAction(CONFIG_COMPLETE)({serverUrl:config.serverUrl}));
//	yield put(createAction(AUTHENTICATE)()); // once config is loaded make a authenticated call for sso
}


export function* fetchData() {
  while(true) {
    const action = yield take(CONFIG);
    yield call(fetch,action);
  }
}



// for auth 
export function* auth(){
	const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
  };
  const res = yield call(request,'http://localhost:3000/authenticated',requestOptions);
  console.log('prefligtht',res)
}

export function* isAuthenticated(){
	while(true){
		const action = yield take(AUTHENTICATE);
		yield call(auth,action);
	}
}


export function* Config() {
  yield fork(fetchData);
  yield fork(isAuthenticated);
}


export default [
  Config,
];