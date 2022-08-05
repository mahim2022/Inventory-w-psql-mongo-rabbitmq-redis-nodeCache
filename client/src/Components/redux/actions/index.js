import axios from "axios";
import { FETCH_ITEMS, UPDATE_ITEMS } from "./types";
import { getAllProducts } from "../../api/mongo_api";
import { update_items } from "../../api/psql_api";

export const fetch_items = () => {
	return function (dispatch) {
		return getAllProducts()
			.then((data) => {
				dispatch(set_items(data));
			})
			.catch((error) => console.log(error.message));
	};
};

// export const update_item = (id, data) => async (dispatch) => {
// 	try {
// 		const res = await update_items(id, data);
// 		dispatch({ type: UPDATE_ITEMS, payload: res });
// 	} catch (error) {
// 		console.log(error.message);
// 	}
// };
//////////////////
/////////////////
///////////////////////
const set_items = (data) => {
	return {
		type: FETCH_ITEMS,
		payload: data,
	};
};
