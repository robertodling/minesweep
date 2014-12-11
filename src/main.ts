var minesweep;

(function (minesweep) {

	var config = {
		width: 18,
		height: 18,
		bombs: 20,
		rows: 20,
		columns: 20
	};

	minesweep.start = function () {

		var game = minesweep.game;

		game.init(config);
		game.redraw();
	};

})(minesweep || (minesweep = {}));

