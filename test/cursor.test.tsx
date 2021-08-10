import * as React from "react";
import * as ReactDOM from "react-dom";
import CustomCursor from "../src";

describe("it", () => {
	it("renders without crashing", () => {
		const div = document.createElement("div");
		ReactDOM.render(<CustomCursor />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
});
