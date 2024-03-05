/**
 * This code handles some UI interactions and animations:
 *
 * - Rotates a .turned element on hover
 * - Shows/hides header and footer based on intersection with viewport
 * - Calculates correct viewport height/width units for elements
 * - Animates profile image position based on mouse move
 * - Applies 3D transform to portfolio items on hover
 */
import { getCorrectVHUnitsWidth, getCorrectVHUnitsHeight } from "./helpers.js";

// rotate div
document.querySelector(".turned").addEventListener("mouseenter", function (event) {
	event.target.style.transform = "rotate(90deg)";
});

document.querySelector(".turned").addEventListener("mouseleave", function (event) {
	setTimeout(function () {
		event.target.style.transform = "rotate(0deg)";
	}, 350); // delay in ms
});

let header = document.querySelector("header");
let footer = document.querySelector("footer");

let observer = new IntersectionObserver(function (entries) {
	// entries[0] is the first (and only) entry in the array
	if (!entries[0].isIntersecting) {
		// The header is not visible, so show the footer
		header.style.top = "-100vh";
		footer.style.bottom = "0";
		// Adjust the body height to push it up by the size of the footer
		let footerHeight = footer.offsetHeight;
		document.body.style.height = `calc(100vh - ${footerHeight}px)`;
	} else {
		// The header is visible, so hide the footer
		header.style.top = "0";
		footer.style.bottom = "-100vh";
		// Reset the body height
		document.body.style.height = "100vh";
	}
});


calculateCorrectViewportUnits();

// Start observing the header
observer.observe(header);

updateProfileTransform(0.025);

function calculateCorrectViewportUnits() {
	let body = document.querySelector("body");
	let hero = document.querySelector(".hero");
	let section1 = document.querySelector(".section1");
	let section2 = document.querySelector(".section2");

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
	let targetX = 0,
		targetY = 0;
	let currentX = 0,
		currentY = 0;

	// Select the .profile element
	let profile = document.querySelector(".profile");

	// Listen for mousemove events on the document
	document.addEventListener("mousemove", function (e) {
		// Calculate the target position
		targetX = (window.innerWidth / 3 - e.pageX) / 25;
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

const modal = document.querySelector('#myModal');
const modalError = document.querySelector('#myModal-error');
const closeBtn = document.querySelector('.close');


window.onload = function () {
	console.log('window.onload called');

	// fade in page
	document.body.classList.add('visible');
	console.log('fading in');

	/**
	 * Loops through each portfolio item, adds mouseover and mouseout event
	 * listeners to animate the items on hover.
	 * On mouseover, applies a random perspective transform with rotation and scale.
	 * On mouseout, resets transform to default state.
	 */
	const portfolioItems = document.querySelectorAll(".portfolio-item");

	portfolioItems.forEach((item, index) => {
		item.style.transition = "transform 0.5s ease";

		item.addEventListener("mouseover", function () {
			const randomRotation = Math.random() * (5 - 4) + 2;
			const randomScale = Math.random() * (1.008 - 1.02) + 1.02;
			const direction = index % 2 === 0 ? 1 : -1;

			item.style.transform = `perspective(1500px) rotateX(${randomRotation * direction}deg) rotateY(${randomRotation * direction
				}deg) scale(${randomScale})`;
		});

		item.addEventListener("mouseout", function () {
			item.style.transform = "";
		});
	});

	/**
	 * Adds mousemove and mouseout event listeners to the aboutMe element
	 * to add a 3D transform on mousemove that rotates based on the mouse position,
	 * as well as a box shadow and outline.
	 * On mouseout it removes the transform, shadow, and outline.
	*/
	const aboutMe = document.querySelector(".about-content");
	aboutMe.addEventListener("mousemove", function (e) {
		const xAxis = (window.innerWidth / 2 - e.pageX) / 75;
		const yAxis = (window.innerHeight / 2 - e.pageY) / 75;
		aboutMe.style.transition = "transform 0.5s ease, box-shadow 0.5s ease";
		aboutMe.style.transform = `perspective(1500px) rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
		aboutMe.style.boxShadow = "0px 0px 40px rgba(0, 0, 0, 0.08)";
	});

	aboutMe.addEventListener("mouseout", function () {
		aboutMe.style.transition = "transform 0.5s ease, box-shadow 0.5s ease";
		aboutMe.style.transform = "";
		aboutMe.style.boxShadow = "";
	});

	const circleElement = document.querySelector('.circle');

	// run after page load, and only if no touchdevice.
	if (!('ontouchstart' in window)) {
		document.body.style.cursor = 'none';
		circleElement.style.display = 'none';

		// mouse pointer animation
		/**
 * YouTube Tutorial:
 * https://youtu.be/wG_5453Vq98
 */

		console.clear();

		// Select the circle element

		// Create objects to track mouse position and custom cursor position
		const mouse = { x: 0, y: 0 }; // Track current mouse position
		const previousMouse = { x: 0, y: 0 }; // Store the previous mouse position
		const circle = { x: 0, y: 0 }; // Track the circle position

		// Initialize variables to track scaling and rotation
		let currentScale = 0; // Track current scale value
		let currentAngle = 0; // Track current angle value

		// Update mouse position on the 'mousemove' event
		window.addEventListener('mousemove', (e) => {
			mouse.x = e.x;
			mouse.y = e.y;
		});

		// Smoothing factor for cursor movement speed (0 = smoother, 1 = instant)
		const speed = 0.75;

		// Initialize an array to store the positions of the trailing circles
		let { trail, trailElements } = createTrailElements(4);



		const links = document.querySelectorAll('a');
		const inputs = document.querySelectorAll('input');
		const button = document.querySelector('button');
		const message = document.getElementById('message');

		links.forEach((link) => {
			link.addEventListener('mouseenter', () => {
				circleElement.style.backgroundColor = 'rgb(1, 255, 85)';
				trailElements.forEach((el) => {
					el.style.backgroundColor = 'rgb(1, 255, 85)';
				});
			});

			link.addEventListener('mouseleave', () => {
				circleElement.style.backgroundColor = '#2ac2e4';
				trailElements.forEach((el) => {
					el.style.backgroundColor = '#2ac2e4';
				});
			});
		});
		inputs.forEach((input) => {
			input.addEventListener('mouseenter', () => {
				circleElement.style.backgroundColor = 'rgb(1, 255, 85)';
				trailElements.forEach((el) => {
					el.style.backgroundColor = 'rgb(1, 255, 85)';
				});
			});

			input.addEventListener('mouseleave', () => {
				circleElement.style.backgroundColor = '#2ac2e4';
				trailElements.forEach((el) => {
					el.style.backgroundColor = '#2ac2e4';
				});
			});
		});

		// Add event listeners - YES I WILL CLEAN THIS UP HAHA!
		button.addEventListener('mouseenter', () => {
			circleElement.style.backgroundColor = 'rgb(1, 255, 85)';
			trailElements.forEach((el) => {
				el.style.backgroundColor = 'rgb(1, 255, 85)';
			});
		});

		button.addEventListener('mouseleave', () => {
			circleElement.style.backgroundColor = '#2ac2e4';
			trailElements.forEach((el) => {
				el.style.backgroundColor = '#2ac2e4';
			});
		});

		message.addEventListener('mouseenter', () => {
			circleElement.style.backgroundColor = 'rgb(1, 255, 85)';
			trailElements.forEach((el) => {
				el.style.backgroundColor = 'rgb(1, 255, 85)';
			});
		});

		message.addEventListener('mouseleave', () => {
			circleElement.style.backgroundColor = '#2ac2e4';
			trailElements.forEach((el) => {
				el.style.backgroundColor = '#2ac2e4';
			});
		});


		// Start animation
		const tick = () => {


			// MOVE
			// Calculate circle movement based on mouse position and smoothing
			const translateTransform = mouseMove(circle, mouse, speed);

			// SQUEEZE
			// 1. Calculate the change in mouse position (deltaMouse)
			let deltaMouseY;
			let deltaMouseX;
			let mouseVelocity;
			let scaleTransform;
			({ deltaMouseY, deltaMouseX, mouseVelocity, scaleTransform, currentScale } = squeeze(mouse, previousMouse, currentScale, speed));

			// ROTATE
			// 1. Calculate the angle using the atan2 function
			let targetOriginX;
			let targetOriginY;
			let rotateTransform;
			({ targetOriginX, targetOriginY, rotateTransform, currentAngle } = updateRotation(deltaMouseY, deltaMouseX, mouseVelocity, currentAngle, mouse, circle));

			let originX = 50;
			let originY = 50;

			// 4. Smoothly update the transformation origin, so it stretches 'properly'
			// Use lerp to smoothly change the transformation origin
			({ originX, originY } = updateTransformOrigin(originX, targetOriginX, originY, targetOriginY, circleElement));

			// Apply all transformations to the circle element in a specific order: translate -> rotate -> scale
			circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

			// Update the positions of the trailing circles
			updateTrail(circle, trail, trailElements);

			// Request the next frame to continue the animation
			window.requestAnimationFrame(tick);
		};

		// Start the animation loop
		tick();
	};
};

// Get the reCAPTCHA response when the form is submitted
/**
 * Adds a submit event listener to the form that submits the form via AJAX.
 * Shows a success or error modal based on the response.
 * After 3 seconds redirects to another page on success.
 */
const form = document.getElementById('form');
const myModal = document.getElementById('myModal');
const myModalError = document.getElementById('myModal-error');

form.addEventListener('submit', function (e) {
	e.preventDefault();
	const formData = new FormData(form);
	const object = Object.fromEntries(formData);
	const json = JSON.stringify(object);

	fetch('https://api.web3forms.com/submit', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: json
	})
		.then(async (response) => {
			let json = await response.json();
			if (response.status == 200) {
				myModal.style.visibility = 'visible';
				myModal.style.opacity = '1';
				setTimeout(function () {
					myModal.style.visibility = 'hidden';
					myModal.style.opacity = '0';
					window.location.href = '/';
				}, 3000);
			} else {
				console.log(response);
				myModalError.style.visibility = 'visible';
				myModalError.style.opacity = '1';
				setTimeout(function () {
					myModalError.style.visibility = 'hidden';
					myModalError.style.opacity = '0';
				}, 3000);
			}
		})
		.catch(error => {
			console.log(error);
			myModalError.style.visibility = 'visible';
			myModalError.style.opacity = '1';
			setTimeout(function () {
				myModalError.style.visibility = 'hidden';
				myModalError.style.opacity = '0';
			}, 3000);
		})
		.then(function () {
			form.reset();
		});
});
/**
 * Updates the transform origin of the given circle element by lerping between
 * the current origin and the target origin by a fixed lerpSpeed.
 *
 * @param {number} originX - The x value of the current transform origin
 * @param {number} targetOriginX - The target x value to lerp to
 * @param {number} originY - The y value of the current transform origin
 * @param {number} targetOriginY - The target y value to lerp to
 * @param {HTMLElement} circleElement - The circle element to update
 * @returns {Object} - The new origin x and y values after lerping
 */
function updateTransformOrigin(originX, targetOriginX, originY, targetOriginY, circleElement) {
	const lerpSpeed = 0.05; // adjust this value to change the speed of the transition
	originX += (targetOriginX - originX) * lerpSpeed;
	originY += (targetOriginY - originY) * lerpSpeed;

	// Set transformation origin
	circleElement.style.transformOrigin = `${originX}% ${originY}%`;
	return { originX, originY };
}

/**
 * Updates the rotation and transform origin of the circle element based on mouse movement.
 *
 * Calculates a target rotation angle and transform origin using the mouse delta positions.
 * Applies a threshold on the mouse velocity to reduce shakiness.
 * Returns the updated transform origin and rotation transform string.
 *
 * @param {number} deltaMouseY - Change in mouse Y position
 * @param {number} deltaMouseX - Change in mouse X position
 * @param {number} mouseVelocity - Speed of mouse movement
 * @param {number} currentAngle - Current rotation angle
 * @param {Object} mouse - Mouse position object
 * @param {HTMLElement} circle - Circle element to rotate
 * @returns {Object} - Target origin coords and rotation transform string
 */
function updateRotation(deltaMouseY, deltaMouseX, mouseVelocity, currentAngle, mouse, circle) {
	const angle = (Math.atan2(deltaMouseY, deltaMouseX) * 180) / Math.PI;
	// 2. Check for a threshold to reduce shakiness at low mouse velocity
	if (mouseVelocity > 20) {
		currentAngle = angle;
	}
	// 3. Create a transformation string for rotation
	const rotateTransform = `rotate(${currentAngle}deg)`;

	// Calculate target transformation origin
	const targetOriginX = mouse.x < circle.x ? 100 : 0;
	const targetOriginY = mouse.y < circle.y ? 100 : 0;
	return { targetOriginX, targetOriginY, rotateTransform, currentAngle };
}

/**
 * Calculates mouse velocity and updates scale based on mouse movement.
 * Smoothes scaling transition.
 *
 * @param {Object} mouse - Current mouse position
 * @param {Object} previousMouse - Previous mouse position
 * @param {number} currentScale - Current scale value
 * @param {number} speed - Transition speed for smoothing
 * @returns {Object} - Mouse velocity, scale transform and updated scale
 */
function squeeze(mouse, previousMouse, currentScale, speed) {
	const deltaMouseX = mouse.x - previousMouse.x;
	const deltaMouseY = mouse.y - previousMouse.y;
	// Update previous mouse position for the next frame
	previousMouse.x = mouse.x;
	previousMouse.y = mouse.y;
	// 2. Calculate mouse velocity using Pythagorean theorem and adjust speed
	const mouseVelocity = Math.min(Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4, 150);
	// 3. Convert mouse velocity to a value in the range [0, 1.25]
	const scaleValue = (mouseVelocity / 150) * 1.05;
	// 4. Smoothly update the current scale
	currentScale += (scaleValue - currentScale) * speed;
	// 5. Create a transformation string for scaling
	const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;
	return { deltaMouseY, deltaMouseX, mouseVelocity, scaleTransform, currentScale };
}

/**
 * Updates circle position based on mouse movement
 *
 * @param {Object} circle - Circle element to move
 * @param {Object} mouse - Current mouse position
 * @param {number} speed - Transition speed for circle movement
 * @returns {string} translateTransform - CSS transform for translation
 */
function mouseMove(circle, mouse, speed) {
	circle.x += (mouse.x - circle.x) * speed;
	circle.y += (mouse.y - circle.y) * speed;
	// Create a transformation string for cursor translation
	const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;
	return translateTransform;
}

/**
 * Creates an array of trail elements by generating divs, styling them,
 * appending them to the DOM, and returning both the data array and
 * array of elements.
 *
 * The size of each trail element is based on its index in the trail array.
 *
 * @param {number} length - Length of trail data array to generate
 * @returns {Object} - trail array and trailElements array
 */
function createTrailElements(length) {
	const trail = Array.from({ length }, () => ({ x: 0, y: 0 }));

	// Create an array of elements for the trailing circles
	const trailElements = trail.map((_, i) => {
		const el = document.createElement("div");
		el.classList.add("trail");

		// Set the initial size of the element based on its index
		const size = 14 - i * 1.5;
		el.style.width = `${size}px`;
		el.style.height = `${size}px`;

		document.body.appendChild(el);
		return el;
	});

	// Return both the trail and trailElements arrays
	return { trail, trailElements };
}

/**
 * Updates the trail array and DOM elements to match the current circle position.
 *
 * Shifts all trail positions back by one, dropping the last position. Sets
 * the first trail position to the current circle x/y. Then translates each
 * trail DOM element to match the updated trail positions.
 *
 * @param {Object} circle - The circle element
 * @param {Array} trail - Array of trail positions
 * @param {Array} trailElements - Array of trail DOM elements
 */
function updateTrail(circle, trail, trailElements) {
	// Shift all positions in the trail array to the next position
	for (let i = trail.length - 1; i > 0; i--) {
		trail[i].x = trail[i - 1].x;
		trail[i].y = trail[i - 1].y;
	}

	// The first position in the trail directly follows the circle
	trail[0].x = circle.x;
	trail[0].y = circle.y;

	// Update the position of the trailing circle elements
	for (let i = 0; i < trail.length; i++) {
		const el = trailElements[i];
		const size = parseFloat(el.style.width);
		el.style.transform = `translate(${trail[i].x - size / 2}px, ${trail[i].y - size / 2}px)`;
	}
}
