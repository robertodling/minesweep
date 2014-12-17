var components;

(function (components) {

	var cx = React.addons.classSet;

	components.Tile = React.createClass({
		handleClick: function (e) {
			e.preventDefault();
			var tile = this.props.tile;
			minesweep.interact(tile.row, tile.column, e.button);
		},
		render: function () {

			var row = this.props.row;
			var column = this.props.column;
			var adjacentMines = this.props.adjacentMines;
			var revealed = this.props.revealed;
			var flagged = this.props.flagged;
			var mine = this.props.mine;

			var style = {
				top: row * 18,
				left: column * 18,
				color: adjacentMines >= 3 ? "#AA0000" : (adjacentMines == 2 ? "#00AA00" : "#666666")
			};

			var classes = cx({
				'tile': true,
				'clicked': revealed,
				'mine': mine,
				'flag': flagged,
				'fa': flagged || mine,
				'fa-flag': flagged,
				'fa-bomb': mine,
				'number': adjacentMines > 0 && revealed
			});

			return <div
				className={classes}
				style={style}
				onClick={this.handleClick}
				onContextMenu={this.handleClick}>
			{revealed && adjacentMines > 0 ? adjacentMines : ''}
			</div>;
		}
	});

})(components || (components = {}));
