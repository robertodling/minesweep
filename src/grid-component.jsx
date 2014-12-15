var components;

(function (components) {
	var cx = React.addons.classSet;

	var Grid = React.createClass({

		render: function () {
			var Tile = components.Tile;

			var config = this.props.config;
			var state = this.props.state;
			var createItem = function (tile) {
				return (
					<td>
						<Tile config={config} state={state} tile={tile}/>
					</td>
				)
			};


			var divStyle = {
				display: 'block',
				position: 'relative',
				width: config.columns * config.width,
				height: config.rows * config.height
			};

			var classes = cx({
				'grid': true,
				'dead': !state.alive
			});

			return <div style={divStyle} className={classes}>{
				this.props.grid.tiles.map(createItem)
				};</div>
		}

	});

	components.Grid = Grid;

})(components || (components = {}));
