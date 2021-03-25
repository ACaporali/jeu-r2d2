window.onkeydown = function (e) {
	if ('ArrowUp' === e.key || 'z' === e.key) {
		game.arrowUp = true;
	}

	if ('ArrowLeft' === e.key || 'q' === e.key) {
		game.arrowLeft = true;
	}

	if ('ArrowDown' === e.key || 's' === e.key) {
		game.arrowDown = true;
	}

	if ('ArrowRight' === e.key || 'd' === e.key) {
		game.arrowRight = true;
	}

	if ('p' === e.key) {
		game.run = false;
	}
	
	if ('c' === e.key) {
		// Reprise des déplacements des animations (spaceShip et robot)
		game.run = true;
		game.continue = true;
		game.stopMain = window.requestAnimationFrame( main );
	}
}

window.onkeyup = function (e) {
	if ('ArrowUp' === e.key || 'z' === e.key) {
		game.arrowUp = false;
	}

	if ('ArrowLeft' === e.key || 'q' === e.key) {
		game.arrowLeft = false;
	}

	if ('ArrowDown' === e.key || 's' === e.key) {
		game.arrowDown = false;
	}

	if ('ArrowRight' === e.key || 'd' === e.key) {
		game.arrowRight = false;
	}
}