var components;

(function (components) {


	components.NewGame = React.createClass({
		getInitialState: function () {
			var difficulties = this.props.difficulties;
			return difficulties[this.props.difficulty];
		},
		handleDifficultyChange: function (event) {
			var difficulties = minesweep.difficulties;
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
			minesweep.start(this.state);
			event.preventDefault();
		},
		render: function () {
			var self = this;
			function createOption(key) {
				var name = self.props.difficulties[key].name;
				return <option value={key}>{name}</option>
			}

			return (
				<form onSubmit={this.handleSubmit}>
					<p>
						<label>Difficulty</label>
						<select value={this.state.name.toLowerCase()}
							onChange={this.handleDifficultyChange}>
						{Object.keys(this.props.difficulties).map(createOption)}

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
