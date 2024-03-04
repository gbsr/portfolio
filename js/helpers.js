/*
These functions are used to manually set the units, as regular units
can be inaccurate in some browsers.
*/
export function getCorrectVHUnitsHeight(element) {
	if (!element) return;

	// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
	let vh = window.innerHeight * 0.01;
	// Then we set the value in the --vh custom property to the root of the document
	element.style.setProperty("--vh", `${vh}px`);
}

export function getCorrectVHUnitsWidth(element) {
	if (!element) return;
	// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
	let vw = window.innerWidth * 0.01;
	// Then we set the value in the --vw custom property to the root of the document
	element.style.setProperty("--vw", `${vw}px`);
}
