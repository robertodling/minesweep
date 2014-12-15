module minesweep {

    function createTile(row:number, column:number):Tile;
    function createTile(row:number, column:number, type?:string):Tile;
    function createTile(row:number, column:number, type?:string):Tile {
        var Tile;
        if (type && type === 'bomb') {
            Tile = BombTile;
        } else {
            Tile = EmptyTile;
        }
        return new Tile(row, column);
    }

    function getRandomInt(min, max):number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    export var board = {
        init: function (rows:number, cols:number, bombs:number):void {
            this.sizeRow = rows;
            this.sizeCols = cols;
            this.unflagged = bombs;
            this.mineTripped = false;
            this.rows = [];
            this.hiddenTiles = rows * cols;
            this.bombs = bombs;
            var self = this;
            for (var r = 0; r < rows; r++) {
                var row:Array<Tile> = [];

                for (var c = 0; c < cols; c++) {
                    row.push(createTile(r, c));
                }

                this.rows.push(row);
            }

            for (var i = 0; i < bombs; i++) {

                var bombRow:number = getRandomInt(0, rows);
                var bombColumn:number = getRandomInt(0, cols);
                var bombTile:Tile = createTile(bombRow, bombColumn, 'bomb');
                this.rows[bombRow][bombColumn] = bombTile;
            }

            for (var r = 0; r < rows; r++) {

                for (var c = 0; c < cols; c++) {
                    var cell:Tile = self.getCell(r, c);
                    if (cell instanceof BombTile) {
                        continue;
                    }
                    var emptyTile:EmptyTile = <EmptyTile>cell;
                    var number = 0;
                    [-1 + r, r, 1 + r].forEach(function (r2) {
                        [-1 + c, c, 1 + c].forEach(function (c2) {

                            if (!(c === c2 && r === r2) && r2 >= 0 && r2 < self.sizeRow && c2 >= 0 && c2 < self.sizeCols) {
                                var cell2:Tile = self.getCell(r2, c2);
                                if (cell2 instanceof BombTile) {
                                    number++;
                                }
                            }

                        });
                    });
                    emptyTile.adjacentMines = number;
                }
            }
        },

        getCell: function (row:number, column:number):Tile {
            return this.rows[row][column];
        },
        flag: function (row:number, column:number) {
            var cell:Tile = this.getCell(row, column);
            cell.isFlagged = !cell.isFlagged;
            if (cell.isFlagged) {
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


            var cell:Tile = this.getCell(row, column);

            if (cell instanceof BombTile) {
                this.mineTripped = true;
                alert('lost');
                return;
            }
            if (!(cell instanceof EmptyTile)) {
                throw new Error('Uknown tile instance')
            }
            var emptyTile = <EmptyTile>cell;
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


            if (this.hiddenTiles === this.bombs) {
                alert('won');
            }
        },

        // representation of state
        toJSON: function () {
            return {
                cells: this.rows.map(function (row) {
                    return row.map(function (cell) {
                        return cell;
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
