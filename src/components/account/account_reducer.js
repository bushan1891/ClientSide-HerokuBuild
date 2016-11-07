import { CREATE_ACCOUNT , FETCH_ACCOUNT,FETCH_ACCOUNT_COMPLETE, UPDATE_ACCOUNT , DELETE_ACCOUNT, UPDATE_ACCOUNT_COMPLETE} from './types';

// this is for dev use 
const AccountStructure = [{ 
accountName:'name',
author:'name',
sow:[
]
 },{}] 


export default function(state=[],action){
	
	switch(action.type){
		case  FETCH_ACCOUNT_COMPLETE:
		return state.concat(action.payload); 
		case UPDATE_ACCOUNT_COMPLETE : 
		return state;
	}
	
	return state;
}