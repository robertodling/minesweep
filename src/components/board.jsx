var components;

(function (components) {

	components.Board = React.createClass({

		render: function () {
			var Tile = components.Tile;

			var width = this.props.width;
			var height = this.props.height;
			var tiles = this.props.tiles;

			var createTile = function (tile) {
				return <Tile row={tile.row} column={tile.column}/>;
			};

			var style = {
				width: width * 18,
				height: height * 18
			};

			return <div className={'grid'} style={style}>{
				tiles.map(createTile)
				};</div>
		}

	});

})(components || (components = {}));
