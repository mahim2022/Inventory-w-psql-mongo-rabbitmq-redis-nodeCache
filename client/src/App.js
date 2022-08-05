import { Container } from "@mui/material";
import { useState } from "react";
import ButtonAppBar from "./Components/ui/AppBar/AppBar";
import { Items } from "./Components/ui/Items/items.jsx";

function App() {
	return (
		<Container>
			<ButtonAppBar></ButtonAppBar>
			<Items></Items>
		</Container>
	);
}

export default App;
