window.onkeydown = function (e) {
	if ('ArrowUp' === e.key) {
		game.arrowUp = true;
	}

	if ('ArrowLeft' === e.key) {
		game.arrowLeft = true;
	}

	if ('ArrowDown' === e.key) {
		game.arrowDown = true;
	}

	if ('ArrowRight' === e.key) {
		game.arrowRight = true;
	}

	if ('s' === e.key) {
		game.run = false;
	}
}

window.onkeyup = function (e) {
	if ('ArrowUp' === e.key) {
		game.arrowUp = false;
	}

	if ('ArrowLeft' === e.key) {
		game.arrowLeft = false;
	}

	if ('ArrowDown' === e.key) {
		game.arrowDown = false;
	}

	if ('ArrowRight' === e.key) {
		game.arrowRight = false;
	}
}