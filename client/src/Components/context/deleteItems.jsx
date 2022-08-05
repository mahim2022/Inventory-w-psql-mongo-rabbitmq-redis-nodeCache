import { useState } from "react";
import { createContext } from "react";

export const DeleteItems = createContext();

export const DeleteItemsProvider = (props) => {
	const [deleteItems, setDeleteItems] = useState(null);
	return (
		<DeleteItems.Provider value={[deleteItems, setDeleteItems]}>
			{props.children}
		</DeleteItems.Provider>
	);
};
