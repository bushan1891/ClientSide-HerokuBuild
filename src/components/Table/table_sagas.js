import { take, call, select, fork, put } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import { POST_TABLE , POST_TABLE_SUCCESSFUL , FETCH_TABLES , FETCH_TABLES_COMPLETE} from './types';
import { CART_ITEM , NEW_CART_ITEM , NEW_CART,UPDATE_TO_CART,ADD_TO_CART} from './viewtable/edittable/types';
import request from '../../utils/request'
import {selectGlobal} from '../../selectors';

export const getConfig = (state) => state.config;
export const getCart = (state) =>state.cart;
export function* Post(action) {
		const config = yield select(getConfig);
		const api = config.serverUrl;
		const requestUrl = `${api}table`
		const jwt = localStorage.getItem('token');
		const requestOptions = {
			method:'post',
			headers:{
				'Authorization' : `${jwt}`
			},
			body:JSON.stringify(action.payload)
		}
		console.log(requestOptions);


	// push new table to backend
		const res = yield call(request, requestUrl, requestOptions);
		console.log('tables',res);
	// call post successfull 
		

	// fetch all tables from backend 


}

export function* Fetch(action) {
	const config = yield select(getConfig);
	const api = config.serverUrl;
		const requestUrl = `${api}tables`
		const jwt = localStorage.getItem('token');
		const requestOptions = {
			method:'get',
			headers:{
				'Authorization' : `${jwt}`
			}
		}
	// push new table to backend
		const res = yield call(request, requestUrl, requestOptions);
	// make a fetch_table_complete call 

		console.log(res.data);


	    yield put(createAction(FETCH_TABLES_COMPLETE)(res.data));
}

export function* PostTableWatcher() {
  while(true) {
    const action = yield take(POST_TABLE);
    yield call(Post,action);
  }
}

export function* FetchTableWatcher(){
	while(true){
		const action = yield take(FETCH_TABLES);
		yield call(Fetch,action);
	}
}


//cart item watcher 

export function* createCart(action){
	// check cart for exsisting item 
	const cart = yield select(getCart);

	// when cart is empty 
	if(cart.table.length==0){
		// no cart preset create a new cart 
	 yield put(createAction(NEW_CART)(action.payload));	
	
	}
	// when cart gets different element 
	else if(true){

		var diffTable=false;
		var sameTable=false;
	     cart.table.forEach(function(obj){
			if(!(obj._id==action.payload._id)){
				diffTable=true;
			}
			if(obj._id==action.payload._id){
				sameTable=true;
			}

		})
			//if diffrent table found add it to the cart 
	     if(diffTable==true&&sameTable==false){
	     yield put(createAction(ADD_TO_CART)(action.payload));	
	     }

	     // if same table found update the entire cart
		if(sameTable==true){
			var newCartTable =[];
			cart.table.forEach(function(obj){
				if(obj._id==action.payload._id){
					newCartTable.push(action.payload);
				}
				else if(!(obj._id==action.payload._id)){
					newCartTable.push(obj);
				}

			});
				// size of cart and new cart must be same 
				if(cart.table.length==newCartTable.length){
					swal('Updated Your Cart !');
					 yield put(createAction(UPDATE_TO_CART)(newCartTable));	
				}
				else{
					alert('error updating');
				}	

		}

	    
	}	

}
// 
export function* newCart(action){
	console.log('caught at saga')	
}

export function* newcartWatcher(){
	while(true){
		const action = yield take(NEW_CART);
		yield call(newCart,action);
	}
}

export function* cartItemWatcher(){
	while(true){
		const action = yield take(CART_ITEM);
		yield call(createCart,action);
	}
}

export function* postTable() {
  yield fork(PostTableWatcher);
  yield fork(FetchTableWatcher);
}

export function* cart(){
  yield fork(cartItemWatcher);
  yield fork(newcartWatcher);
}

export default [
  postTable,
  cart
];