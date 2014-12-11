var minesweep;

(function (minesweep) {

	var Status = React.createClass({

		render: function () {
			return <div>{this.props.state.alive ? 'alive' : 'dead'}</div>
		}
	});

	minesweep.Status = Status;

})(minesweep || (minesweep = {}));
