var components;

(function (components) {

	var Result = React.createClass({

		render: function () {


			return (
				<div>
					<h3>You {this.props.results.status} after {this.props.results.seconds} seconds<button onClick={this.handleOnClick}>New Game</button></h3>

					<div><b>Statistics for '{this.props.results.difficulty}' difficulty:</b></div>
					<div>Best time: {this.props.statistics.best.seconds} seconds ({this.props.statistics.best.date})</div>
					<div>Games played: {this.props.statistics.played}</div>
					<div>Games won: {this.props.statistics.won} ({this.props.statistics.wonPercent}%)</div>

				</div>

			)
		}	});

	components.Result = Result;

})(components || (components = {}));
