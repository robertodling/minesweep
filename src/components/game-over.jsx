var components;

(function (components) {

	components.GameOver = React.createClass({

		handleOnClick: function (event) {
			event.preventDefault();
			minesweep.newGame();
		},

		render: function () {
			var props = this.props;
			var game = props.game;
			var statistics = props.statistics;
			return (
				<div>
					<h3>You {game.status}</h3>
					<div>Time elapsed {game.seconds} seconds</div>
					<br/>
					<div>
						<b>Statistics for '{game.difficulty}' difficulty:</b>
					</div>
					<br/>
					<div>Best time: {statistics.best.time} seconds ({statistics.best.date})</div>
					<br/>
					<div>Games won: {statistics.won} (..%)</div>
					<br/>
					<button onClick={this.handleOnClick}>New Game</button>
				</div>
			)
		}
	});

})(components || (components = {}));
