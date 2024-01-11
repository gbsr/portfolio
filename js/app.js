
// rotate div
document.querySelector('.turned').addEventListener('mouseenter', function (event) {
	event.target.style.transform = 'rotate(90deg)';
});

document.querySelector('.turned').addEventListener('mouseleave', function (event) {
	setTimeout(function () {
		event.target.style.transform = 'rotate(0deg)';
	}, 350); // delay in ms
});

let header = document.querySelector('header');
let footer = document.querySelector('footer');

let observer = new IntersectionObserver(function (entries) {
	// entries[0] is the first (and only) entry in the array
	if (!entries[0].isIntersecting) {
		// The header is not visible, so show the footer
		header.style.top = '-100vh';
		footer.style.bottom = '0';
	} else {
		// The header is visible, so hide the footer
		header.style.top = '0';
		footer.style.bottom = '-100vh';
	}
});

// Start observing the header
observer.observe(header);