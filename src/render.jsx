var components;

(function (components) {

	function render(config, state, board) {
		var Board = components.Board;
		var Status = components.Status;

		React.render(<Board config={config} state={state} board={board}/>, document.getElementById('main'));
		//React.render(<Status state={state}/>, document.getElementById('status'));
	}

	components.render = render;

})(components || (components = {}));