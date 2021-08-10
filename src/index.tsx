import * as React from "react";
import Cursor, { ICursorOpts } from "./Cursor";
import {
	addHoverEvent,
	handleWindowLeave,
	removeHoverEvent,
	removeWindowLeaveHandler,
} from "./utils";

// import "./globals.css";

interface CustomCursorProps {
	className?: string;
	width?: number;
	height?: number;
	fill?: string;
	stroke?: string;
	strokeWidth?: number;
	opacity?: number;
	targets?: string | string[];
	targetScale?: number;
	targetOpacity?: number;
	options?: ICursorOpts;
}

const CustomCursor: React.FC<CustomCursorProps> = ({
	className = "",
	width = 50,
	height = 50,
	fill = "#000",
	stroke = "#000",
	strokeWidth = 0,
	targets,
	options,
}) => {
	const ref = React.useRef<SVGSVGElement>(null);

	React.useEffect(() => {
		if (!ref.current) return;

		const cursor = new Cursor(ref.current, options);

		addHoverEvent(cursor, targets);
		handleWindowLeave(cursor);

		return () => {
			removeWindowLeaveHandler(cursor);
			removeHoverEvent(cursor, targets);
			cursor.destroy();
		};
	}, [options, targets, ref]);

	return (
		<div className={`cursor ${className}`}>
			<svg
				ref={ref}
				height={height}
				width={width}
				viewBox={`0 0 ${width} ${height}`}
			>
				<circle
					cx={width / 2}
					height={height / 2}
					r={width / 4}
					fill={fill}
					stroke={stroke}
					strokeWidth={strokeWidth}
				></circle>
			</svg>
		</div>
	);
};

export default CustomCursor;
