import { useState } from "react";
import { Container, TextField, ButtonGroup, Button } from "@mui/material";
import { create_item } from "../../api/psql_api";
import { CounterState } from "../../context/counter";
import { useContext } from "react";

export const CreateItemForm = ({ handleClose }) => {
	const [counter, setCounter] = useContext(CounterState);
	const [data, setData] = useState({
		productname: "",
		productprice: "",
		sku: "",
	});

	const handleSubmit = async () => {
		const res = await create_item(data);
		if (res) {
			setCounter(!counter);
		}
		handleClose();
	};

	const handleCancel = () => {
		handleClose();
	};

	return (
		<Container
			style={{
				padding: "15px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
			}}
		>
			<TextField
				id="outlined-basic"
				label="productName"
				variant="outlined"
				style={{ paddingBottom: "10px" }}
				value={data.productname}
				onChange={(e) => {
					setData({ ...data, productname: e.target.value });
				}}
			/>
			<TextField
				id="outlined-basic"
				label="price"
				variant="outlined"
				style={{ paddingBottom: "10px" }}
				value={data.productprice}
				onChange={(e) => {
					setData({ ...data, productprice: e.target.value });
				}}
			/>
			<TextField
				id="outlined-basic"
				label="sku"
				variant="outlined"
				style={{ paddingBottom: "10px" }}
				value={data.sku}
				onChange={(e) => {
					setData({ ...data, sku: e.target.value });
				}}
			/>
			<Container>
				<ButtonGroup>
					<Button variant="contained" color="success" onClick={handleSubmit}>
						Save
					</Button>
					<Button variant="contained" color="error" onClick={handleCancel}>
						Cancel
					</Button>
				</ButtonGroup>
			</Container>
		</Container>
	);
};
