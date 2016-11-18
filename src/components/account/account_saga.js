import { take, call, select, fork, put } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import { CREATE_ACCOUNT , FETCH_ACCOUNT ,FETCH_ACCOUNT_COMPLETE , UPDATE_ACCOUNT , DELETE_ACCOUNT ,FETCH_TEMPLATES_COMPLETE,FETCH_TEMPLATES ,UPDATE_ACCOUNT_COMPLETE} from './types';
import request from '../../utils/request';
import {selectGlobal} from '../../selectors';

export const getCart = (state) =>state.cart;
export const getConfig = (state) => state.config;

export function* createAccount(action){
	console.log('Accont create ', action);
	const requestBody= {...action.payload,sow:[]}

	const config = yield select(getConfig);
		const api = config.serverUrl;
		const requestUrl = `${api}account`
		const jwt = localStorage.getItem('token');
		const requestOptions = {
			method:'post',
			headers:{
				'Authorization' : `${jwt}`
			},
			body:JSON.stringify(requestBody)
		}
	 
	 const res = yield call(request,requestUrl,requestOptions);
	 // call account fetch here
	  yield put(createAction(FETCH_ACCOUNT)());

}

export function* fetchAccount(action){
	console.log('fetchAccount create ', action);

		const config = yield select(getConfig);
		const api = config.serverUrl;
		const requestUrl = `${api}account`
		const jwt = localStorage.getItem('token');
		const requestOptions = {
			method:'get',
			headers:{
				'Authorization' : `${jwt}`
			}
		}
	 
	 const res = yield call(request,requestUrl,requestOptions);
	 // call account fetch here

	 yield put(createAction(FETCH_ACCOUNT_COMPLETE)(res.data));

}

export function* fetchTemplate(action){
		const config = yield select(getConfig);
		const api = config.serverUrl;
		const requestUrl = `${api}template`
		const jwt = localStorage.getItem('token');
		const requestOptions = {
			method:'get',
			headers:{
				'Authorization' : `${jwt}`
			}
		}
	 
	 const res = yield call(request,requestUrl,requestOptions);
	 // call account fetch here

	 yield put(createAction(FETCH_TEMPLATES_COMPLETE)(res.data));

}
export function* updateAccount(action){
		const config = yield select(getConfig);
		const api = config.serverUrl;
		const requestUrl = `${api}account/${action.payload._id}`
		const jwt = localStorage.getItem('token');
		const requestOptions = {
			method:'put',
			headers:{
				'Authorization' : `${jwt}`
			},
			body:JSON.stringify(action.payload)
		}
	 
	 const res = yield call(request,requestUrl,requestOptions);
	 // call account fetch here
		
	 console.log(JSON.stringify(action.payload));	
	 yield put(createAction(UPDATE_ACCOUNT_COMPLETE)());
	 yield put(createAction(FETCH_ACCOUNT)());


}

export function* deleteAccount(action){
	console.log('deleteAccount  ', action);
		const config = yield select(getConfig);
		const api = config.serverUrl;
		const requestUrl = `${api}account/${action.payload}`
		const jwt = localStorage.getItem('token');
		const requestOptions = {
			method:'delete',
			headers:{
				'Authorization' : `${jwt}`
			}
		}
	 
	 const res = yield call(request,requestUrl,requestOptions);
	 // call account fetch here

	 location.reload();

}



 export function* accountCreateWatcher(){
	while(true){
		const action = yield take(CREATE_ACCOUNT);
		yield call(createAccount,action);
	}
}

 export function* accountFetchWatcher(){
	while(true){
		const action = yield take(FETCH_ACCOUNT);
		yield call(fetchAccount,action);
	}
}

export function* templateFetchWatcher(){
	while(true){
		const action = yield take(FETCH_TEMPLATES);
		yield call(fetchTemplate,action);
	}
}

export function* accountUpdateWatcher(){
	while(true){
		const action = yield take(UPDATE_ACCOUNT);
		yield call(updateAccount,action);
	}
}

export function* accountDeleteWatcher(){
	while(true){
		const action = yield take(DELETE_ACCOUNT);
		yield call(deleteAccount,action);
	}
}


export function* accountSaga(){
  yield fork(accountCreateWatcher);
  yield fork(accountFetchWatcher);
  yield fork(accountDeleteWatcher);
  yield fork(templateFetchWatcher);
  yield fork(accountUpdateWatcher);
}

export default [
 accountSaga,
];           