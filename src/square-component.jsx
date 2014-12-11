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
				color: square.number >= 3 ? "#AA0000" : (square.number == 2 ? "#00AA00" : "#666666"),
			};

			var classes = cx({
				'cell': true,
				'clicked': square.clicked,
				'bomb': square.bomb,
				'flag': square.flag,
				'fa': square.flag || square.bomb,
				'fa-flag': square.flag,
				'fa-bomb': square.bomb && !state.alive,
				'number': square.number > 0 && square.clicked
			});

			return <div className={classes} style={divStyle} onClick={this.handleClick} onContextMenu={this.handleClick}>
			{square.clicked && square.number > 0 ? square.number : ''}
			</div>;
		}
	});

	components.Square = Square;

})(components || (components = {}));
