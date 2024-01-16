
export function getCorrectVHUnits(element) {

	// fallback in case we can't find the actual element, because reasons.

	if
		(!element) {
		element = document.querySelector('body');
		console.log('Element not found, reverting to fallback:' + element);
	}
	// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
	let vh = window.innerHeight * 0.01;
	// Then we set the value in the --vh custom property to the root of the document
	element.style.setProperty('--vh', `${vh}px`);
}

