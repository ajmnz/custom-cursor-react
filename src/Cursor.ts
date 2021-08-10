import { getMousePos, lerp } from "./utils";

interface IRenderedStylesInner {
	previous: number;
	current: number;
	amt: number;
}

interface IRenderedStyles {
	tx: IRenderedStylesInner;
	ty: IRenderedStylesInner;
	scale: IRenderedStylesInner;
	opacity: IRenderedStylesInner;
	[key: string]: IRenderedStylesInner;
}

export interface ICursorOpts {
	smoothness?: {
		movement?: number;
		scale?: number;
		opacity?: number;
	};
	opacity?: number;
	targetOpacity?: number;
	targetScale?: number;
}

interface ICursorCleanOpts {
	smoothness: {
		movement: number;
		scale: number;
		opacity: number;
	};
	opacity: number;
	targetOpacity: number;
	targetScale: number;
}

/**
 * Main class that handles all the
 * cursor movement and behavior.
 *
 * @param el
 * @param smoothness
 * @param opacity
 * @param targetOpacity
 * @param targetScale
 */
export default class Cursor {
	el: SVGSVGElement;
	bounds: DOMRect;
	renderedStyles: IRenderedStyles;
	opts: ICursorCleanOpts;
	isVisible: boolean;
	mouse: { x: number; y: number };

	constructor(el: SVGSVGElement, opts?: ICursorOpts) {
		this.el = el;
		this.bounds = this.el.getBoundingClientRect();
		this.opts = {
			opacity: opts?.opacity || 1,
			targetOpacity: opts?.targetOpacity || 1,
			targetScale: opts?.targetScale || 4,
			smoothness: {
				movement: opts?.smoothness?.movement || 0.2,
				scale: opts?.smoothness?.scale || 0.2,
				opacity: opts?.smoothness?.opacity || 0.2,
			},
		};

		this.renderedStyles = {
			tx: {
				previous: 0,
				current: 0,
				amt: this.opts.smoothness.movement,
			},
			ty: {
				previous: 0,
				current: 0,
				amt: this.opts.smoothness.movement,
			},
			scale: {
				previous: 1,
				current: 1,
				amt: this.opts.smoothness.scale,
			},
			opacity: {
				previous: 1,
				current: this.opts.opacity,
				amt: this.opts.smoothness.opacity,
			},
		};

		this.isVisible = true;
		this.mouse = {
			x: 0,
			y: 0,
		};

		window.addEventListener("mousemove", this.getPos);
		window.addEventListener("mousemove", this.handleInitialMouseEvent);
	}

	private getPos = (ev: MouseEvent) => {
		this.mouse = getMousePos(ev);
	};

	private handleInitialMouseEvent = () => {
		this.renderedStyles.tx.current = this.mouse.x - this.bounds.width / 2;
		this.renderedStyles.tx.previous = this.renderedStyles.tx.current;
		this.renderedStyles.ty.current = this.mouse.y - this.bounds.height / 2;
		this.renderedStyles.ty.previous = this.renderedStyles.ty.current;

		// Do gsap animation thing with opacity

		requestAnimationFrame(() => this.render());

		window.removeEventListener("mousemove", this.handleInitialMouseEvent);
	};

	public enter = () => {
		this.renderedStyles.scale.current = this.opts.targetScale;
		this.renderedStyles.opacity.current = this.opts.targetOpacity;
	};

	public leave = () => {
		this.renderedStyles.scale.current = 1;
		this.renderedStyles.opacity.current = this.opts.opacity;
	};

	public hide = (ev: MouseEvent) => {
		if (!ev.relatedTarget) {
			this.isVisible = false;
			// gsap opacity
		}
	};

	public show = () => {
		this.isVisible = true;
		requestAnimationFrame(() => this.render());

		// Gsap thing
	};

	public destroy() {
		this.isVisible = false;
		window.removeEventListener("mousemove", this.getPos);
	}

	private render() {
		this.renderedStyles.tx.current = this.mouse.x - this.bounds.width / 2;
		this.renderedStyles.ty.current = this.mouse.y - this.bounds.height / 2;

		Object.keys(this.renderedStyles).forEach((key) => {
			this.renderedStyles[key].previous = lerp(
				this.renderedStyles[key].previous,
				this.renderedStyles[key].current,
				this.renderedStyles[key].amt
			);
		});

		this.el.style.transform = `translate3d(${this.renderedStyles.tx.previous}px, ${this.renderedStyles.ty.previous}px, 0) scale(${this.renderedStyles.scale.previous})`;
		this.el.style.opacity = "" + this.renderedStyles.opacity.previous;

		if (this.isVisible) {
			requestAnimationFrame(() => this.render());
		}
	}
}
