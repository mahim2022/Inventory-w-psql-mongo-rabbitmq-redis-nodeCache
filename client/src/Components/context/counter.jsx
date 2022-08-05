import { create } from "@mui/material/styles/createTransitions";
import { createContext, useState } from "react";

export const CounterState = createContext();

export const CounterProvider = (props) => {
	const [counter, setCounter] = useState(true);
	return (
		<CounterState.Provider value={[counter, setCounter]}>
			{props.children}
		</CounterState.Provider>
	);
};
