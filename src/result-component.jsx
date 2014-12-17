var components;

(function (components) {

	var Result = React.createClass({

		handleOnClick: function (event) {
			event.preventDefault();
			minesweep.newGame();
		},

		render: function () {

			return (
				<div>
					<h3>You {this.props.results.status}</h3>
					<div>Time elapsed {this.props.results.seconds} seconds</div>
					<br/>
					<div>
						<b>Statistics for '{this.props.results.difficulty}' difficulty:</b>
					</div>
					<br/>
					<div>Best time: {this.props.statistics.best.time} seconds ({this.props.statistics.best.date})</div>
					<br/>

					<div>Games won: {this.props.statistics.won} (..%)</div>
					<br/>
					<button onClick={this.handleOnClick}>New Game</button>
				</div>

			)
		}
	});

	components.Result = Result;

})(components || (components = {}));
