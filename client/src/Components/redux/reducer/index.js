import { FETCH_ITEMS, UPDATE_ITEMS } from "../actions/types";

export default function (state = [], action) {
	switch (action.type) {
		case FETCH_ITEMS:
			return { data: action.payload };
		// case UPDATE_ITEMS:
		// 	return state.map((product) => {
		// 		return product._id === action.payload ? action.payload : product;
		// 	});
		default:
			return state;
	}
}
