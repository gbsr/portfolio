
// rotate div
document.querySelector('.turned').addEventListener('mouseenter', function (event) {
	event.target.style.transform = 'rotate(90deg)';
});

document.querySelector('.turned').addEventListener('mouseleave', function (event) {
	setTimeout(function () {
		event.target.style.transform = 'rotate(0deg)';
	}, 350); // delay in ms
});