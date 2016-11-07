import { take, call, select, fork, put } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import {CREATE_ROOM,FETCH_ROOMS,DELETE_ROOMS ,POST_MESSAGE,RECIEVE_MESSAGE ,FETCH_ROOMS_COMPLETE} from './types';
import request from '../../utils/request'
import {selectGlobal} from '../../selectors';

export const getConfig = (state) => state.config;
export const getCart = (state) =>state.cart;



export function* createCollab(action) {
		const config = yield select(getConfig);
		const api = config.serverUrl;
		const requestUrl = `${api}collab`
		const jwt = localStorage.getItem('token');
		let rooms = [];
		rooms.push(action.payload); 
		const reqBody = {
			rooms:rooms
		}
			

		const requestOptions = {
			method:'post',
			headers:{
				'Authorization' : `${jwt}`
			},
			body:JSON.stringify(reqBody)
		}

		const res = yield call(request,requestUrl,requestOptions);	
}

export function* fetchRooms(action) {
		const config = yield select(getConfig);
		const api = config.serverUrl;
		const requestUrl = `${api}collab`
		const jwt = localStorage.getItem('token');

		const requestOptions = {
			method:'get',
			headers:{
				'Authorization' : `${jwt}`
			}
		}
		const media = yield call(request,requestUrl,requestOptions);
		console.log('response' , media.data);
	    yield put(createAction(FETCH_ROOMS_COMPLETE)(media.data));
}


export function* collabItemWatcher(){
	while(true){
		const action = yield take(CREATE_ROOM);
		yield call(createCollab,action);
	}
}

export function* collabFetchWatcher(){
	while(true){
		const action = yield take(FETCH_ROOMS);
		yield call(fetchRooms,action);
	}
}

export function* collab(){
  yield fork(collabItemWatcher);
  yield fork(collabFetchWatcher);
}

export default [
  collab,
];