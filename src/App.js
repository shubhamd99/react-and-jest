import React from "react";
import "./App.css";
import { api } from "./api";

const App = () => {
	const [items, setItems] = React.useState([]);
	const [text, setText] = React.useState("");

	const handleChange = (e) => setText(e.target.value);

	// const handleSubmit = (e) => {
	// 	e.preventDefault();

	// 	if (!text.length) {
	// 		return;
	// 	}

	// 	const newItem = {
	// 		text,
	// 		id: Date.now()
	// 	};

	// 	setText("");
	// 	setItems(items.concat(newItem));
	// };

	// With Promise
	const handleSubmit = (e) => {
		e.preventDefault();

		if (!text.length) {
			return;
		}

		const newItem = {
			text,
			id: Date.now()
		};

		api.createItem("/items", newItem).then((persistedItem) => {
			setText("");
			setItems(items.concat(persistedItem));
		});
	};

	return (
		<div className="App">
			<h1>TODOS</h1>

			<ul data-testid="list">
				{items.map((item) => (
					<li key={item.id}>{item.text}</li>
				))}
			</ul>

			<form onSubmit={handleSubmit}>
				<label htmlFor="new-todo">What needs to be done?</label>
				<br />
				<input id="new-todo" value={text} onChange={handleChange} />
				<button>Add #{items.length + 1}</button>
			</form>
		</div>
	);
};

export default App;
