import axios from "axios";

const mongoApi = axios.create({ baseURL: "http://localhost:5000/inventory" });

export const getAllProducts = () => {
	return mongoApi.get().then(({ data }) => {
		return data;
	});
};
