
import {CREATE_ROOM,FETCH_ROOMS,DELETE_ROOMS ,POST_MESSAGE,RECIEVE_MESSAGE ,FETCH_ROOMS_COMPLETE} from './types';

const intialState={
	rooms:[]
}
export default function(state=intialState , action){
	switch(action.type){
	case FETCH_ROOMS_COMPLETE:

	return {...state,rooms:action.payload};	
	}
return state;
}