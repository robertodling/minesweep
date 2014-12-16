var components;

(function (components) {

	var difficulties = {
		beginner: {
			name:'beginner',
			columns: 9,
			rows: 9,
			mines: 10
		},
		intermediate: {
			name:'intermediate',
			columns: 16,
			rows: 16,
			mines: 10
		},
		advanced: {
			name:'advanced',
			columns: 30,
			rows: 16,
			mines: 99
		}
	};


	var NewGame = React.createClass({
		getInitialState: function () {
			return difficulties['intermediate'];
		},
		handleDifficultyChange: function (event) {
			this.setState(difficulties[event.target.value]);

		},
		handleColumnsChange: function (event) {
			this.setState({columns: parseInt(event.target.value,10)});
		},
		handleRowsChange: function (event) {
			this.setState({rows: parseInt(event.target.value,10)});
		},
		handleMinesChange: function (event) {
			this.setState({mines: parseInt(event.target.value,10)});
		},

		handleSubmit: function (event) {
			minesweep.start(this.state);
			event.preventDefault();
		},
		render: function () {
			var text = this.state.liked ? 'like' : 'haven\'t liked';
			return (
				<form onSubmit={this.handleSubmit}>
					<p>
						<label>Difficulty</label>
						<select value={this.state.name} onChange={this.handleDifficultyChange}>
							<option value="beginner">Beginner</option>
							<option value="intermediate">Intermediate</option>
							<option value="advanced">Advanced</option>
							<option value="custom">Custom</option>
						</select>
						<button type="submit">New Game</button>

					</p>

					<p>
						<label>Columns</label>
						<input name="columns" onChange={this.handleColumnsChange} value={this.state.columns}/>
					</p>

					<p>
						<label>Rows</label>
						<input name="rows" onChange={this.handleRowsChange} value={this.state.rows}/>
					</p>

					<p>
						<label>Mines</label>
						<input name="mines" onChange={this.handleMinesChange}  value={this.state.mines}/>
					</p>



				</form>
			)
		}
	});


	components.NewGame = NewGame;

})(components || (components = {}));
