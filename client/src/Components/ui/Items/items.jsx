import { useContext, useState } from "react";
import CheckboxList from "./CheckBoxList";
import { useEffect } from "react";
import store from "../../redux/store/index";
import { fetch_items } from "../../redux/actions";
import { CounterState } from "../../context/counter";
import { getAllProducts } from "../../api/mongo_api";

export const Items = () => {
	const [items, setItems] = useState(null);
	const [counter, setCounter] = useContext(CounterState);

	useEffect(() => {
		// const { data } = store.getState();
		// setItems(data);
		getAllProducts().then((res) => {
			setItems(res);
		});
	}, [counter]);

	return <CheckboxList items={items}></CheckboxList>;
};
