
// this function resizes my hero container to always be below the header no matter how it is resized due to wrapping.
window.addEventListener('resize', adjustContainerMargin);

function adjustContainerMargin() {
	let headerHeight = document.querySelector('header').offsetHeight;
	document.querySelector('.container').style.marginTop = `${headerHeight}px`;
}

// Call the function initially to set the margin
adjustContainerMargin();

