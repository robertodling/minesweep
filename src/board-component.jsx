var components;

(function (components) {
	var cx = React.addons.classSet;

	var Board = React.createClass({

		render: function () {
			var Square = components.Square;

			var config = this.props.config;
			var state = this.props.state;
			var createItem = function (square) {
				return (
					<td>
						<Square config={config} state={state} square={square}/>
					</td>)
			};

			var divStyle = {
				position: 'relative',
				display: 'block',
				float: 'left',
				width: config.rows * config.width,
				heigt: config.columns * config.height
			};

			var classes = cx({
				'dead': !state.alive
			});

			return <div style={divStyle} className={classes}>{
				this.props.board.cells.map(createItem)
				};</div>
		}


	});

	components.Board = Board;

})(components || (components = {}));
