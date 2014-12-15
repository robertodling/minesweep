var components;

(function (components) {

	var cx = React.addons.classSet;

	var Tile = React.createClass({
		handleClick: function (e) {
			var game = minesweep.game;
			e.preventDefault();
			var tile = this.props.tile;
			game.gridInteract(tile.row, tile.column, e.button);

		},
		render: function () {

			var tile = this.props.tile;
			var config = this.props.config;
			var state = this.props.state;

			var divStyle = {
				top: tile.row * config.width,
				left: tile.column * config.height,
				color: tile.adjacentMines >= 3 ? "#AA0000" : (tile.adjacentMines == 2 ? "#00AA00" : "#666666"),
			};

			var classes = cx({
				'tile': true,
				'clicked': tile.isRevealed,
				'mine': tile.mine,
				'flag': tile.flag,
				'fa': tile.flag || tile.mine,
				'fa-flag': tile.flag,
				'fa-mine': tile.mine && !state.alive,
				'number': tile.adjacentMines > 0 && tile.isRevealed
			});

			return <div className={classes} style={divStyle} onClick={this.handleClick} onContextMenu={this.handleClick}>
			{tile.isRevealed && tile.adjacentMines > 0 ? tile.adjacentMines : ''}
			</div>;
		}
	});

	components.Tile = Tile;

})(components || (components = {}));
