module minesweep {

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	export var board = {
		init: function (rows, cols, bombs) {
			this.sizeRow = rows;
			this.sizeCols = cols;
			this.rows = [];
			var self = this;
			for (var r = 0; r < rows; r++) {
				var row = [];

				for (var c = 0; c < cols; c++) {

					row.push({
						row: r,
						column: c
					});
				}

				this.rows.push(row);
			}

			for (var i = 0; i < bombs; i++) {

				var bombRow = getRandomInt(0, rows);
				var bombColumn = getRandomInt(0, cols);
				this.getCell(bombRow, bombColumn).bomb = true;
			}

			for (var r = 0; r < rows; r++) {

				for (var c = 0; c < cols; c++) {
					var cell = self.getCell(r, c);
					if (cell.bomb) {
						continue;
					}
					var number = 0;
					[-1 + r, r, 1 + r].forEach(function (r2) {
						[-1 + c, c, 1 + c].forEach(function (c2) {

							if (!(c === c2 && r === r2) && r2 >= 0 && r2 < self.sizeRow && c2 >= 0 && c2 < self.sizeCols) {
								var cell2 = self.getCell(r2, c2);
								if (cell2.bomb) {
									number++;
								}
							}

						});
					});
					cell.number = number;
				}
			}
		},
		getCell: function (row, column) {
			return this.rows[row][column];
		},
		flag: function (row, column) {
			var cell = this.getCell(row, column);
			cell.flag = !cell.flag;
		},
		check: function (row, column) {
			var game = minesweep.game;
			var withinBounds = row >= 0 && row < this.sizeRow && column >= 0 && column < this.sizeCols;
			if (!withinBounds) {
				return;
			}

			var cell = this.getCell(row, column);

			if (cell.bomb) {
				game.getState().alive = false;
				return;
			}

			if (cell.flag) {
				return;
			}
			if (cell.clicked || cell.number > 0) {
				cell.clicked = true;
				return;
			} else {
				cell.clicked = true;

				this.check(row - 1, column - 1);
				this.check(row - 1, column);
				this.check(row - 1, column + 1);

				this.check(row, column - 1);
				this.check(row, column + 1);

				this.check(row + 1, column - 1);
				this.check(row + 1, column);
				this.check(row + 1, column + 1);
			}

		},

		// representation of state
		toJSON: function () {
			var json = {
				cells: this.rows.map(function (row) {
					return row.map(function (cell) {
						return cell;
					});
				}).reduce(function (a, b) {
					return a.concat(b);
				})
			};
			return json;
		}
	};

}
