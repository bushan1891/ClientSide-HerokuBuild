import { take, call, select, fork, put } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import { CREATEWBS ,SAVE_AS_TEMPLATE , SAVE_AS_TEMPLATE_COMPLETE} from './types';
import request from '../../utils/request';
import {selectGlobal} from '../../selectors';
import _ from 'lodash';

export const getCart = (state) =>state.cart;
export const getConfig = (state) => state.config;
export const getTable = (state) =>state.table;

export function* createWBS(action) {
	console.log('action payload' , action);
		const config = yield select(getConfig);
		const api = config.serverUrl;
		const requestUrl = `${api}excel`
		const jwt = localStorage.getItem('token');
		let download=false;
		const requestOptions = {
			method:'post',
			headers:{
				'Authorization' : `${jwt}`
			},
			body:JSON.stringify(action.payload)
		}
		console.log(JSON.stringify(action.payload));
	    const res =yield call(request, requestUrl, requestOptions);

	    // now promt use if he wants to download the file 
	     

const requestOptionsGet = {
			method:'get',
			headers:{
				'Authorization' : `${jwt}`
				}
			}
	  const res1= yield call(request, requestUrl,requestOptionsGet);
	    console.log('res1',res1);
	    window.open(requestUrl, '', 'width=1000');	    
}



export function* createTemplate(action) {
	console.log('action payload' , action);
		const config = yield select(getConfig);
		const table = yield select(getTable);
		const cart = action.payload.cart;
		let otherItem=[];

	   // construct the template json
		if(!(_.isEmpty(table))){
			var found=0;
				cart.forEach(function(item){
					
					for(var x in table){
						const str1 = table[x]._id;
						const str2 = item._id;
						if(str1 == str2){
							console.log(str1,' same',str2 );
							found++;
						}
						else if ((!(str1 == str2))&& (found!=cart.length) ){
							console.log(str1,' not same',str2);
							otherItem.push(table[x]);
						}
					}

				})
		console.log('before applying uniqe',otherItem);

		}
		else{
				alert('Tables not found');
		}
		const templateName = action.payload.title;
		
		const template = {
			otherItem,
			cart,
			templateName
		}

		console.log('template',template);

		const api = config.serverUrl;
		const requestUrl = `${api}template`
		const jwt = localStorage.getItem('token');
		const requestOptions = {
			method:'post',
			headers:{
				'Authorization' : `${jwt}`
			},
			body:JSON.stringify(template)
		}
		console.log(JSON.stringify(action.payload));
	   const res= yield call(request, requestUrl, requestOptions);
		console.log(res);
}	



export function* cartWatcher(){
	while(true){
		const action = yield take(CREATEWBS);
		yield call(createWBS,action);
	}
}

export function* templateWatcher(){
	while(true){
		const action = yield take(SAVE_AS_TEMPLATE);
		yield call(createTemplate,action);
	}
}


export function* cartExport(){
  yield fork(cartWatcher);
  yield fork(templateWatcher);
}

export default [
 cartExport,
];