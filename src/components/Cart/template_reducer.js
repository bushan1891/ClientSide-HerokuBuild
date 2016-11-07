import {SAVE_AS_TEMPLATE , SAVE_AS_TEMPLATE_COMPLETE} from './types';

const InitialState = {
	templateName:'',
	cartItem:[],
	otherItem:[]
}

export default function (state=InitialState,action){
	switch(action.type){
		case SAVE_AS_TEMPLATE_COMPLETE: 
		return state; 
	}

	return state;
}