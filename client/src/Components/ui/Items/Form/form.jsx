import * as React from "react";
import TextField from "@mui/material/TextField";
import { Button, ButtonGroup, Container } from "@mui/material";
import { useState } from "react";
import { update_items } from "../../../api/psql_api";
import { useContext } from "react";
import { CounterState } from "../../../context/counter";

export default function BasicTextFields({ item, handleClose }) {
	const [counter, setCounter] = useContext(CounterState);

	const [data, setData] = useState({
		productname: item.productname,
		productprice: item.productprice,
		sku: item.sku,
	});

	const handleSubmit = async () => {
		const res = await update_items(item.psql_id, data);
		setCounter(!counter);
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
}
