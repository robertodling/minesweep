var components;

(function (components) {

	components.Board = React.createClass({

		render: function () {
			var Tile = components.Tile;

			var props = this.props;
			var width = props.width;
			var height = props.height;
			var tiles = props.tiles;

			var createTile = function (tile) {
				return <Tile row={tile.row}
					column={tile.column}
					flagged={tile.isFlagged}
					revealed={tile.isRevealed}
					adjacent={tile.adjacentMines}
				/>;
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
