var components;

(function (components) {

	var cx = React.addons.classSet;

	var Tile = React.createClass({
		handleClick: function (e) {
			e.preventDefault();
			var tile = this.props.tile;
			var game = minesweep.gridInteract(tile.row, tile.column, e.button);

		},
		render: function () {

			var tile = this.props.tile;

			var divStyle = {
				top: tile.row * 18,
				left: tile.column * 18,
				color: tile.adjacentMines >= 3 ? "#AA0000" : (tile.adjacentMines == 2 ? "#00AA00" : "#666666"),
			};

			var classes = cx({
				'tile': true,
				'clicked': tile.isRevealed,
				'mine': tile.mine,
				'flag': tile.flag,
				'fa': tile.flag || tile.mine,
				'fa-flag': tile.flag,
				'fa-bomb': tile.mine,
				'number': tile.adjacentMines > 0 && tile.isRevealed
			});

			return <div className={classes} style={divStyle} onClick={this.handleClick} onContextMenu={this.handleClick}>
			{tile.isRevealed && tile.adjacentMines > 0 ? tile.adjacentMines : ''}
			</div>;
		}
	});

	components.Tile = Tile;

})(components || (components = {}));
