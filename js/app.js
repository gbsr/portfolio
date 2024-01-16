import { getCorrectVHUnits } from "./helpers";

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

let hero = document.querySelector('.hero');
let calculatedVH = getCorrectVHUnits(hero);
hero.style.paddingTop = header.offsetHeight + 'px';

// Start observing the header
observer.observe(header);

updateProfileTransform(0.025);

function updateProfileTransform(speed) {

	// declaring variables
	let targetX = 0, targetY = 0;
	let currentX = 0, currentY = 0;

	// Select the .profile element
	let profile = document.querySelector('.profile');

	// Listen for mousemove events on the document
	document.addEventListener('mousemove', function (e) {
		// Calculate the target position
		targetX = (window.innerWidth / 2 + e.pageX) / 25;
		targetY = (window.innerHeight / 2 + e.pageY) / 25;
	});

	// Function to smoothly transition the element's position
	function animate() {
		// Calculate the distance to the target position
		let dx = targetX - currentX;
		let dy = targetY - currentY;

		// Gradually adjust the current position
		currentX += dx * speed;
		currentY += dy * speed;

		// Update the transform property of the .profile element
		profile.style.transform = `translate(${currentX}px, ${currentY}px)`;

		// Request the next frame
		requestAnimationFrame(animate);
	}

	// Start the animation
	animate();
}