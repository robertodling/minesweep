module minesweep {

    function getRandomInt(min, max):number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    export var grid = {
        init: function (rows:number, cols:number, mines:number):void {
            this.sizeRow = rows;
            this.sizeCols = cols;
            this.unflagged = mines;
            this.mineTripped = false;
            this.rows = [];
            this.hiddenTiles = rows * cols;
            this.mines = mines;
            var self = this;
            for (var r = 0; r < rows; r++) {
                var row:Array<Tile> = [];

                for (var c = 0; c < cols; c++) {
                    row.push(new EmptyTile(r, c));
                }

                this.rows.push(row);
            }

            for (var i = 0; i < mines; i++) {

                var mineRow:number = getRandomInt(0, rows);
                var mineColumn:number = getRandomInt(0, cols);
                this.rows[mineRow][mineColumn] = new MineTile(mineRow, mineColumn);
            }

            for (var r = 0; r < rows; r++) {

                for (var c = 0; c < cols; c++) {
                    var tile:Tile = self.getTile(r, c);
                    if (tile instanceof MineTile) {
                        continue;
                    }
                    var emptyTile:EmptyTile = <EmptyTile>tile;
                    var number = 0;
                    [-1 + r, r, 1 + r].forEach(function (r2) {
                        [-1 + c, c, 1 + c].forEach(function (c2) {

                            if (!(c === c2 && r === r2) && r2 >= 0 && r2 < self.sizeRow && c2 >= 0 && c2 < self.sizeCols) {
                                var tile2:Tile = self.getTile(r2, c2);
                                if (tile2 instanceof MineTile) {
                                    number++;
                                }
                            }

                        });
                    });
                    emptyTile.adjacentMines = number;
                }
            }
        },

        getTile: function (row:number, column:number):Tile {
            return this.rows[row][column];
        },
        flag: function (row:number, column:number) {
            var tile:Tile = this.getTile(row, column);
            tile.isFlagged = !tile.isFlagged;
            if (tile.isFlagged) {
                this.unflagged--;
            } else {
                this.unflagged++;
            }
        },
        check: function (row:number, column:number):void {

            var withinBounds = row >= 0 && row < this.sizeRow && column >= 0 && column < this.sizeCols;
            if (!withinBounds) {
                return;
            }


            var tile:Tile = this.getTile(row, column);

            if (tile instanceof MineTile) {
                this.mineTripped = true;
                over(false)
                return;
            }
            if (!(tile instanceof EmptyTile)) {
                throw new Error('Uknown tile instance')
            }
            var emptyTile = <EmptyTile>tile;
            if (emptyTile.isFlagged) {
                return;
            }
            if (!emptyTile.isRevealed) {
                this.hiddenTiles = --this.hiddenTiles;
            };
            if (emptyTile.isRevealed || emptyTile.adjacentMines > 0) {
                emptyTile.isRevealed = true;

            } else {
                emptyTile.isRevealed = true;

                this.check(row - 1, column - 1);
                this.check(row - 1, column);
                this.check(row - 1, column + 1);

                this.check(row, column - 1);
                this.check(row, column + 1);

                this.check(row + 1, column - 1);
                this.check(row + 1, column);
                this.check(row + 1, column + 1);
            }


            if (this.hiddenTiles === this.mines) {
               over(true);
            }
        },

        // representation of state
        toJSON: function () {
            return {
                tiles: this.rows.map(function (row) {
                    return row.map(function (tile) {
                        return tile;
                    });
                }).reduce(function (a, b) {
                    return a.concat(b);
                }),
                unflagged: this.unflagged,
                mineTripped: this.mineTripped
            };
        }
    };

}
