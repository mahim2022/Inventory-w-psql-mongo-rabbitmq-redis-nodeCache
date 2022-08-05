import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import BasicPopover from "./basicPopOver";
import { useState } from "react";
import { DeleteItems } from "../../context/deleteItems";
import { useContext } from "react";

export default function CheckboxList({ items }) {
	const [deleteItems, setDeleteItems] = useContext(DeleteItems);
	const [checked, setChecked] = React.useState([]);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);

		setDeleteItems(newChecked);
	};

	return (
		<>
			<List
				style={{ marginTop: "10px" }}
				sx={{ width: "100%", bgcolor: "background.paper" }}
			>
				{items != null ? (
					items.map((cur) => {
						const labelId = cur.psql_id;

						return (
							<ListItem
								key={cur.psql_id}
								secondaryAction={<BasicPopover item={cur}></BasicPopover>}
								disablePadding
							>
								<ListItemButton
									role={undefined}
									onClick={handleToggle(cur.psql_id)}
									dense
								>
									<ListItemIcon>
										<Checkbox
											edge="start"
											checked={checked.indexOf(cur.psql_id) !== -1}
											tabIndex={-1}
											disableRipple
											inputProps={{ "aria-labelledby": cur.psql_id }}
										/>
									</ListItemIcon>
									<ListItemText id={cur.psql_id} primary={cur.productname} />
									<ListItemText
										id={cur.psql_id}
										primary={cur.productprice}
									></ListItemText>
									<ListItemText
										id={cur.psql_id}
										primary={cur.sku}
									></ListItemText>
								</ListItemButton>
							</ListItem>
						);
					})
				) : (
					<h1>Loading</h1>
				)}
			</List>
		</>
	);
}
