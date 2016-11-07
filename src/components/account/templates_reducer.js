import {FETCH_TEMPLATES,FETCH_TEMPLATES_COMPLETE} from './types';

export default function(state=[],action){
	switch(action.type){
		case FETCH_TEMPLATES : 
		return state;
		case FETCH_TEMPLATES_COMPLETE :
		return state.concat(action.payload);
	}
	return state;
}