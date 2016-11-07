
import { POST_TABLE , POST_TABLE_SUCCESSFUL , FETCH_TABLES,FETCH_TABLES_COMPLETE} from './types';

export default function(state =[],action){
  switch (action.type) {
		case FETCH_TABLES_COMPLETE: 
		return {...state,...action.payload}
  }
  return state;
}