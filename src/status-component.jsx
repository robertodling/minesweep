var components;

(function (components) {

	var cx = React.addons.classSet;

	var Status = React.createClass({
		handleOnClick: function (event){
			event.preventDefault()
			minesweep.newGame();

		},
		render: function () {

			return (
				<div>
					<span>{this.props.difficulty} ({this.props.dimensions.rows}x{this.props.dimensions.columns})</span>
					<i className={  cx({
						'fa': true,
						'fa-clock-o': true
					})}></i>
					<span>{this.props.timeElapsed}</span>
					<i className={ cx({
						'fa': true,
						'fa-bomb': true
					})}></i>
					<span>{this.props.minesLeft}</span>
					<button onClick={this.handleOnClick}>New Game</button>
				</div>
			)
		}
	});


	components.Status = Status;

})(components || (components = {}));
