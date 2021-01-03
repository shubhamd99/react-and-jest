import React from "react";
import ReactDOM from "react-dom";
// import { getQueriesForElement } from '@testing-library/dom';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import { api } from "./api";

// Normally you can mock entire module using jest.mock('./api);
const mockCreateItem = (api.createItem = jest.fn());

const renderComp = (component) => {
	// Render a React component to the DOM
	const root = document.createElement("div");
	ReactDOM.render(component, root);

	return getQueriesForElement(root);
}

test("renders the correct content", () => {
	// const { getByText, getByLabelText } = renderComp(<App />);
	const { getByText, getByLabelText } = render(<App />);

	// Use DOM APIs (querySelector) to make assertions
	// expect(root.querySelector("h1").textContent).toBe("TODOS");
	// expect(root.querySelector("label").textContent).toBe("What needs to be done?");
	// expect(root.querySelector("button").textContent).toBe("Add #1");

	// expect(getByText("TODOS")).not.toBeNull();
	// expect(getByLabelText("What needs to be done?")).not.toBeNull();
	// expect(getByText("Add #1")).not.toBeNull();

	// Make assertion (Refactor)
	getByText("TODOS");
	getByLabelText("What needs to be done?");
	getByText("Add #1");

});

// fireEvent (will fail with async submit)
test("allow users to add items to their list", () => {
	const { getByText, getByLabelText } = render(<App />);

	const input = getByLabelText("What needs to be done?");
	fireEvent.change(input, { target: { value: "RTL Presentation Slides" } });
	fireEvent.click(getByText("Add #1"));

	getByText("RTL Presentation Slides");
	getByText("Add #2");
});

// userEvent (will fail with async submit)
test("user-events allows users to add items to their list", () => {
	const { getByText, getByLabelText } = render(<App />);
  
	const input = getByLabelText("What needs to be done?");
	const button = getByText("Add #1");
  
	userEvent.type(input, "Learn spanish");
	userEvent.click(button);
  
	getByText("Learn spanish");
	getByText("Add #2");
});

// Async
test("allows users to add items to their list async", async () => {

	const todoText = "Learn spanish";
	// Useful to resolve different values over multiple async calls:
	mockCreateItem.mockResolvedValueOnce({ id: 123, text: todoText });
	
	const { getByText, getByLabelText } = render(<App />);

	const input = getByLabelText("What needs to be done?");
	const button = getByText("Add #1");

	fireEvent.change(input, { target: { value: todoText } });

	await act(async () => { // the await / async here is important
        fireEvent.click(button);
    })

	expect(mockCreateItem).toBeCalledTimes(1);
	await waitFor(() => getByText(todoText));

	expect(mockCreateItem).toBeCalledWith(
		"/items",
		expect.objectContaining({ text: todoText })
	);

});
  