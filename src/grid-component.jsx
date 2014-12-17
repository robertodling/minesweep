var components;

(function (components) {
	var cx = React.addons.classSet;

	var Grid = React.createClass({

		render: function () {
			var Tile = components.Tile;

			var grid = this.props.grid;

			var createItem = function (tile) {
				return (
					<td>
						<Tile tile={tile}/>
					</td>
				)
			};


			var divStyle = {
				display: 'block',
				position: 'relative',
				width: grid.width * 18,
				height: grid.height * 18
			};

			var classes = cx({
				'grid': true
			});

			return <div style={divStyle} className={classes}>{
				this.props.grid.tiles.map(createItem)
				};</div>
		}

	});

	components.Grid = Grid;

})(components || (components = {}));
