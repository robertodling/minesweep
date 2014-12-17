var components;

(function (components) {

	components.Status = React.createClass({
		handleOnClick: function (event) {
			event.preventDefault();
			minesweep.newGame();
		},

		render: function () {
			var props = this.props;
			var height = props.height;
			var width = props.width;
			var difficulty = props.difficulty;
			var elapsedTime = props.elapsedTime;
			var mineCount = props.mineCount;
			return (
				<div>
					<div>{difficulty}
					({height}x{width})
					</div>
					<i className={"fa fa-clock-o"}></i>
					<div>{elapsedTime}</div>
					<i className={"fa fa-bomb"}></i>
					<div>{mineCount}</div>
					<br/>
					<button onClick={this.handleOnClick}>New Game</button>
				</div>
			)
		}
	});

})(components || (components = {}));
