var components;

(function (components) {

	var difficulties = mineCountweep.difficulties;

	components.NewGame = React.createClass({
		getInitialState: function () {
			return difficulties['intermediate'];
		},
		handleDifficultyChange: function (event) {
			this.setState(difficulties[event.target.value]);

		},
		handleColumnsChange: function (event) {
			this.setState({width: parseInt(event.target.value, 10)});
		},
		handleRowsChange: function (event) {
			this.setState({height: parseInt(event.target.value, 10)});
		},
		handleMinesChange: function (event) {
			this.setState({mineCount: parseInt(event.target.value, 10)});
		},

		handleSubmit: function (event) {
			mineCountweep.start(this.state);
			event.preventDefault();
		},
		render: function () {

			return (
				<form onSubmit={this.handleSubmit}>
					<p>
						<label>Difficulty</label>
						<select value={this.state.name}
							onChange={this.handleDifficultyChange}>
							<option value="beginner">Beginner</option>
							<option value="intermediate">Intermediate</option>
							<option value="advanced">Advanced</option>
							<option value="custom">Custom</option>
						</select>
						<button type="submit">New Game</button>
					</p>
					<p>
						<label>Columns</label>
						<input name="width"
							onChange={this.handleColumnsChange}
							value={this.state.width}/>
					</p>
					<p>
						<label>Rows</label>
						<input name="height"
							onChange={this.handleRowsChange}
							value={this.state.height}/>
					</p>
					<p>
						<label>Mines</label>
						<input name="mineCount"
							onChange={this.handleMinesChange}
							value={this.state.mineCount}/>
					</p>

				</form>
			)
		}
	});

})(components || (components = {}));
