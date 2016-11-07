import { CART_ITEM , NEW_CART_ITEM , NEW_CART , UPDATE_TO_CART,ADD_TO_CART} from '../Table/viewtable/edittable/types';

const initialState ={
table:[]
}
export default function(state=initialState,action){
	switch(action.type){
		case NEW_CART: 
		return {...state,table:state.table.concat(action.payload)};

		case UPDATE_TO_CART:
		const table =action.payload;
		console.log(JSON.stringify(table));
		return {...state,table:table};

		case ADD_TO_CART:
		return {...state,table:state.table.concat(action.payload)}
	}
	return state;
}