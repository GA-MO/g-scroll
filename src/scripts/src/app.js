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
    for (let i=0; i<selector.length; i++) {
      checkPoint(selector[i]);
    }
  } else {
    checkPoint(selector);
  }
}


/**
 * Start hover fucntion
 * @param  {Object} selector
 */
function checkPoint(props) {
	// Default properties
	const initialState = {
		selector: props.selector || '',
		offset: props.offset || 0,
		delay: props.delay || 0,
		action: props.action || null,
	};

  // Assign custom properties with default properties
	// const initialState = { defaltProperties, ...props };
	
	// Trigger point in view
	initScroll();

  // Event scroll
	window.addEventListener('scroll', () => initScroll());
	
	function initScroll(){
    // Get DOM
	  const _selector = document.querySelectorAll(initialState.selector);
    
		Array.prototype.forEach.call(_selector, (element, i) => {
			isVisible(element, initialState.offset, initialState.delay, initialState.action)
		});
	};
	
	// Check DOM is on screen
	function isVisible(selector, offset = 0, delay = 0, funcTrigger) {
		const THIS = selector;
		if (!THIS.classList.contains('visibled')) {
			// Hidden DOM frist
			THIS.style.visibility = 'hidden';
			
			const winHeight = window.innerHeight;
			const windowTop = document.body.scrollTop;
			const rect = THIS.getBoundingClientRect();
			const prosTop = rect.top + windowTop;
			const realTop = (prosTop - windowTop) + offset;
			
			// If Current DOM is visible on screen
			if (winHeight >= realTop) {
				// Add class visibled
				THIS.classList.add('visibled');

				// Call custom function
				setTimeout(function() {
					THIS.style.visibility = 'visible';
					funcTrigger(THIS)
				}, delay * 1000)
			};
		}
		return false;
	}
}