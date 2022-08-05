import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./Components/redux/store/index";
import { Provider } from "react-redux";
import { CounterProvider } from "./Components/context/counter";
import { DeleteItemsProvider } from "./Components/context/deleteItems";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<DeleteItemsProvider>
			<CounterProvider>
				<Provider store={store}>
					<App />
				</Provider>
			</CounterProvider>
		</DeleteItemsProvider>
	</React.StrictMode>
);
