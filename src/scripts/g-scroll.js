'use strict';

/*
╔══════════════════════╗
╫	┬─── ┬──┬ ┬─┬─┬ ┬──┬ ╫
╫	│ ─┬ ├──┤	│ ┴ │ │  │ ╫
╫	┴──┴ ┴  ┴ ┴   ┴ ┴──┴ ╫
╚══════════════════════╝
GScroll is a lightweight javascript tool to trigger a function when you scroll to a DOM.
*/

/**
 * Check selector type
 * @param {Oject or Array} selector
 */
function GScroll(selector) {
	if (Array.isArray(selector)) {
		for (var i = 0; i < selector.length; i++) {
			checkPoint(selector[i]);
		}
	} else {
		checkPoint(selector);
	}
}

/**
 * Start checkPoint fucntion
 * @param  {Object} selector
 */
function checkPoint(props) {
	// Default properties
	var initialState = {
		selector: props.selector || '',
		offset: props.offset || 0,
		delay: props.delay || 0,
		action: props.action || null
	};

	// Trigger point in view
	initScroll();

	// Event scroll
	window.addEventListener('scroll', function () {
		return initScroll();
	});

	function initScroll() {
		// Get DOM
		var _selector = document.querySelectorAll(initialState.selector);

		Array.prototype.forEach.call(_selector, function (element, i) {
			isVisible(element, initialState.offset, initialState.delay, initialState.action);
		});
	};

	// Check DOM is on screen
	function isVisible(selector) {
		var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
		var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
		var funcTrigger = arguments[3];

		var THIS = selector;
		if (!THIS.classList.contains('visibled')) {
			// Hidden DOM frist
			THIS.style.visibility = 'hidden';

			var winHeight = window.innerHeight;
			var windowTop = document.body.scrollTop;
			var rect = THIS.getBoundingClientRect();
			var prosTop = rect.top + windowTop;
			var realTop = prosTop - windowTop + offset;

			// If Current DOM is visible on screen
			if (winHeight >= realTop) {
				// Add class visibled
				THIS.classList.add('visibled');

				// Call custom function
				setTimeout(function () {
					THIS.style.visibility = 'visible';
					funcTrigger(THIS);
				}, delay * 1000);
			};
		}
		return false;
	}
}