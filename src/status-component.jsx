var components;

(function (components) {

	var cx = React.addons.classSet;

	var Status = React.createClass({
		handleOnClick: function (event) {
			event.preventDefault();
			minesweep.newGame();

		},
		render: function () {

			return (
				<div>
					<div>
						<div>{this.props.difficulty} ({this.props.dimensions.rows}x{this.props.dimensions.columns})</div>
						<i className={  cx({
							'fa': true,
							'fa-clock-o': true
						})}></i>
						<div>{this.props.timeElapsed}</div>
						<i className={ cx({
							'fa': true,
							'fa-bomb': true
						})}></i>
						<div>{this.props.minesLeft}</div>
					</div>

					<br/>
					<button onClick={this.handleOnClick}>New Game</button>
				</div>
			)
		}
	});


	components.Status = Status;

})(components || (components = {}));
