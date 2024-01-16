import { getCorrectVHUnitsWidth, getCorrectVHUnitsHeight } from "./helpers.js";

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

calculateCorrectViewportUnits();

// Start observing the header
observer.observe(header);

updateProfileTransform(0.025);


function calculateCorrectViewportUnits() {
	let body = document.querySelector('body');
	let hero = document.querySelector('.hero');
	let section1 = document.querySelector('.section1');
	let section2 = document.querySelector('.section2');

	if (body) {
		let calculatedHeight = getCorrectVHUnitsHeight(body);
		let calculatedWidth = getCorrectVHUnitsWidth(body);
		body.style.height = calculatedHeight;
		body.style.width = calculatedWidth;
	}

	if (hero) {
		let calculatedHeight = getCorrectVHUnitsHeight(hero);
		hero.style.height = calculatedHeight;
	}

	if (section1) {
		let calculatedWidth = getCorrectVHUnitsWidth(section1);
		let calculatedHeight = getCorrectVHUnitsHeight(section1);
		section1.style.width = calculatedWidth;
		section1.style.height = calculatedHeight;
	}

	if (section2) {
		let calculatedWidth = getCorrectVHUnitsWidth(section2);
		let calculatedHeight = getCorrectVHUnitsHeight(section2);
		section2.style.width = calculatedWidth;
		section2.style.height = calculatedHeight;
	}
}

function updateProfileTransform(speed) {

	// declaring variables
	let targetX = 0, targetY = 0;
	let currentX = 0, currentY = 0;

	// Select the .profile element
	let profile = document.querySelector('.profile');

	// Listen for mousemove events on the document
	document.addEventListener('mousemove', function (e) {
		// Calculate the target position
		targetX = ((window.innerWidth / 3 - e.pageX) / 25) - 50;
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