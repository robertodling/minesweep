var minesweep;

(function (minesweep) {

	function render(config, state, board) {
		var Board = minesweep.Board;
		var Status = minesweep.Status;

		React.render(<Board config={config} state={state} board={board}/>, document.getElementById('main'));
		//React.render(<Status state={state}/>, document.getElementById('status'));
	}

	minesweep.render = render;

})(minesweep || (minesweep = {}));