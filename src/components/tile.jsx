var components;

(function (components) {

	var cx = React.addons.classSet;

	components.Tile = React.createClass({
		handleClick: function (e) {
			e.preventDefault();
			var props = this.props;
			var row = props.row;
			var column = props.column;
			minesweep.interact(row, column, e.button);
		},
		render: function () {

			var row = this.props.row;
			var column = this.props.column;
			var adjacent = this.props.adjacent;
			var revealed = this.props.revealed;
			var flagged = this.props.flagged;
			var mine = this.props.mine;

			// TODO set in css
			function getColor(adjacent) {
				if (adjacent >= 3) return '#AA0000';
				if (adjacent === 2) return '#00AA00';
				return '#666666'
			}

			var style = {
				top: row * 18,
				left: column * 18

			};

			var classConfig = {
				'tile': true,
				'revealed': revealed,
				'mine': mine,
				'flag': flagged,
				'fa': flagged || mine,
				'fa-flag': flagged,
				'fa-bomb': mine
			};
			classConfig['adjacent-'+adjacent]= adjacent > 0 && revealed;

			return <div
				className={cx(classConfig)}
				style={style}
				onClick={this.handleClick}
				onContextMenu={this.handleClick}>
			{revealed && adjacent > 0 ? adjacent : ''}
			</div>;
		}
	});

})(components || (components = {}));
