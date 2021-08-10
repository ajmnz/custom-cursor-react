import * as React from "react";
import * as ReactDOM from "react-dom";
import CustomCursor from "../src";
import { render } from "@testing-library/react";

// const DEFAULT_PROPS = {
// 	className: "",
// 	width: 50,
// 	height: 50,
// 	fill: "#000",
// 	stroke: "#000",
// 	strokeWidth: 0,
// };

describe("CustomCursor Component", () => {
	it("should render without crashing", () => {
		const div = document.createElement("div");
		ReactDOM.render(<CustomCursor />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it("should render correctly", () => {
		render(<CustomCursor />);
		expect(document.querySelector(".cursor > svg > circle")).not.toBeNull();
	});
});
