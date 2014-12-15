var components;

(function (components) {

	var cx = React.addons.classSet;

	var Square = React.createClass({
		handleClick: function (e) {
			var game = minesweep.game;
			e.preventDefault();
			var square = this.props.square;
			game.boardInteract(square.row, square.column, e.button);

		},
		render: function () {

			var square = this.props.square;
			var config = this.props.config;
			var state = this.props.state;

			var divStyle = {
				top: square.row * config.width,
				left: square.column * config.height,
				color: square.adjacentMines >= 3 ? "#AA0000" : (square.adjacentMines == 2 ? "#00AA00" : "#666666"),
			};

			var classes = cx({
				'cell': true,
				'clicked': square.isRevealed,
				'bomb': square.bomb,
				'flag': square.flag,
				'fa': square.flag || square.bomb,
				'fa-flag': square.flag,
				'fa-bomb': square.bomb && !state.alive,
				'number': square.adjacentMines > 0 && square.isRevealed
			});

			return <div className={classes} style={divStyle} onClick={this.handleClick} onContextMenu={this.handleClick}>
			{square.isRevealed && square.adjacentMines > 0 ? square.adjacentMines : ''}
			</div>;
		}
	});

	components.Square = Square;

})(components || (components = {}));
