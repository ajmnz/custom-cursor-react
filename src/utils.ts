import Cursor from "./Cursor";

// Linear interpolation
export const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

// Get current mouse position
export const getMousePos = (e: MouseEvent) => {
	let x = 0,
		y = 0;

	// if (!e) e = window.event;

	x = e.clientX;
	y = e.clientY;

	return { x, y };
};

export const addHoverEvent = (cursor: Cursor, targets?: string | string[]) => {
	if (!targets) return;

	if (Array.isArray(targets)) {
		targets.forEach((target) => {
			[].forEach.call(document.querySelectorAll(target), (el: HTMLElement) => {
				el.addEventListener("mouseenter", cursor.enter);
				el.addEventListener("mouseleave", cursor.leave);
			});
		});
	} else {
		[].forEach.call(document.querySelectorAll(targets), (el: HTMLElement) => {
			el.addEventListener("mouseenter", cursor.enter);
			el.addEventListener("mouseleave", cursor.leave);
		});
	}
};

export const removeHoverEvent = (
	cursor: Cursor,
	targets?: string | string[]
) => {
	if (!targets) return;

	if (Array.isArray(targets)) {
		targets.forEach((target) => {
			[].forEach.call(document.querySelectorAll(target), (el: HTMLElement) => {
				el.removeEventListener("mouseenter", cursor.enter);
				el.removeEventListener("mouseleave", cursor.leave);
			});
		});
	} else {
		[].forEach.call(document.querySelectorAll(targets), (el: HTMLElement) => {
			el.removeEventListener("mouseenter", cursor.enter);
			el.removeEventListener("mouseleave", cursor.leave);
		});
	}
};

export const handleWindowLeave = (cursor: Cursor) => {
	document.body.addEventListener("mouseleave", cursor.hide);
	document.body.addEventListener("mouseenter", cursor.show);
};

export const removeWindowLeaveHandler = (cursor: Cursor) => {
	document.body.removeEventListener("mouseleave", cursor.hide);
	document.body.removeEventListener("mouseenter", cursor.show);
};
