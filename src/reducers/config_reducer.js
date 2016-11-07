import { CONFIG , CONFIG_COMPLETE } from '../types';

export default function(state = {},action){
  switch (action.type) {
		case CONFIG_COMPLETE: 
		return {...state,...action.payload}
  }
  return state;
}