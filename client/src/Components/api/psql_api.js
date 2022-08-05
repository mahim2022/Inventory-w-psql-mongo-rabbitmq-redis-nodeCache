import axios from "axios";

const psql_Api = axios.create({ baseURL: "http://localhost:5001/inventory" });

export const update_items = async (id, productData) => {
	const { data } = await psql_Api.patch(`/${id}`, productData);
	return data;
};

export const create_item = async (itemData) => {
	const { data } = await psql_Api.post("/", itemData);
	return data;
};

export const deleteItem = async (itemData) => {
	return await psql_Api.post("/delete", itemData);
};
