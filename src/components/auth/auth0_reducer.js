import {AUTH0_AUTHENTICATE , AUTH0_AUTHENTICATE_LOGOUT} from './types';
const initialValue ={
	auth:false
}

export default function(state =initialValue,action){
	
	switch(action.type){
		case AUTH0_AUTHENTICATE:  
		return {...state,auth:true};
		case AUTH0_AUTHENTICATE_LOGOUT:
		return {...state,auth:false}
	}

	return state;
} 