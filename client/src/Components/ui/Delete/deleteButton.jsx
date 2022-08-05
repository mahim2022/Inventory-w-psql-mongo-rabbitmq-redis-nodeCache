import { Button } from "@mui/material";
import { DeleteItems } from "../../context/deleteItems";
import { useContext } from "react";
import { deleteItem } from "../../api/psql_api";
import { CounterState } from "../../context/counter";

export const DeleteButton = () => {
	const [deleteItems, setDeleteItems] = useContext(DeleteItems);
	const [counter, setCounter] = useContext(CounterState);

	const handleClick = async () => {
		if (deleteItems) {
			const res = await deleteItem({ itemsForDeletion: deleteItems });
			setCounter(!counter);
		} else {
			console.log("Please select items for deletion");
		}
	};

	return (
		<>
			{deleteItems === null ? null : (
				<Button
					style={{ marginLeft: "10px" }}
					variant="contained"
					color="error"
					onClick={handleClick}
				>
					Delete
				</Button>
			)}
		</>
	);
};
