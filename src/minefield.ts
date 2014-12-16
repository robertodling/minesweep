module minesweep {

    function generateEmptyTile(row, column) {
        return new EmptyTile(row, column);
    }

    function addMines(grid, mines) {
        do {
            var tile = grid.getRandom();
            if (tile instanceof MineTile) {
                continue;
            }
            grid.set(tile.row, tile.column, new MineTile(tile.row, tile.column))

        } while (--mines > 0);
    }

    function calculateAdjecentMines(grid) {
        grid.forEach(function (row, column, tile) {
            if (tile instanceof MineTile) {
                return;
            }
            tile.adjacentMines = grid.getAdjecent(row, column)
                .filter(function (adjecentTile) {
                    return adjecentTile instanceof MineTile;
                }).length;
        });
    }

    export var minefield = {
        init: function (height:number, width:number, mineCount:number):void {
            var grid = this.grid = new Grid(height, width, generateEmptyTile);

            this.unflagged = mineCount;

            this.hiddenTiles = height * width;
            this.mines = mineCount;


            addMines(grid, mineCount);

            calculateAdjecentMines(grid);

        },

        getTile: function (row:number, column:number):Tile {
            return this.grid.get(row, column);
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

            var tile:Tile = this.grid.get(row, column);
            if (!tile) {
                return;
            }

            if (tile instanceof MineTile) {
                over();
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
            }

            if (emptyTile.isRevealed || emptyTile.adjacentMines > 0) {
                emptyTile.isRevealed = true;

            } else {
                var self = this;
                emptyTile.isRevealed = true;
                this.grid.getAdjecent(row, column).forEach(function (tile) {
                    self.check(tile.row, tile.column);
                });

            }

            if (this.hiddenTiles === this.mines) {
                over();
            }
        },

        // representation of state
        toJSON: function () {
            var tiles = [];
            this.grid.forEach(function (row, column, tile) {
                tiles.push(tile);
            });
            return {
                tiles: tiles,
                unflagged: this.unflagged

            };
        }
    };

}
