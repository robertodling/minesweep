module minesweep {

    function generateEmptyTile(row:number, column:number):EmptyTile {
        return new EmptyTile(row, column);
    }

    function addMines(grid:Grid<Tile>, mineCount:number):void {
        do {
            var tile:Tile = grid.getRandom();
            if (tile instanceof MineTile) {
                continue;
            }
            grid.set(tile.row, tile.column, new MineTile(tile.row, tile.column))

        } while (--mineCount > 0);
    }

    function calculateAdjecentMines(grid:Grid<Tile>):void {
        grid.forEach(function (row, column, tile) {
            if (tile instanceof MineTile) {
                return;
            }
            tile.adjacentMines = grid.getAdjacent(row, column)
                .filter(function (adjecentTile) {
                    return adjecentTile instanceof MineTile;
                }).length;
        });
    }

    export class MineField {
        private grid:Grid<Tile>;
        private unflaggedMineCount:number;
        private hiddenTiles:number;
        private mineCount:number;

        constructor(height:number, width:number, mineCount:number){
            var grid = this.grid = new Grid<Tile>(height, width, generateEmptyTile);

            this.hiddenTiles = height * width;
            this.mineCount = mineCount;
            this.unflaggedMineCount = mineCount;

            addMines(grid, mineCount);

            calculateAdjecentMines(grid);

        }

        getTile(row:number, column:number):Tile {
            return this.grid.get(row, column);
        }
        flag(row:number, column:number):void {
            var tile:Tile = this.getTile(row, column);
            tile.isFlagged = !tile.isFlagged;
            if (tile.isFlagged) {
                this.unflaggedMineCount--;
            } else {
                this.unflaggedMineCount++;
            }
        }
        reveal(row:number, column:number):void {

            var tile:Tile = this.grid.get(row, column);
            if (!tile) {
                return;
            }

            if (tile instanceof MineTile) {
                gameOver(false);
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
                this.grid.getAdjacent(row, column).forEach(function (tile) {
                    self.reveal(tile.row, tile.column);
                });

            }

            if (this.hiddenTiles === this.mineCount) {
                gameOver(true);
            }
       }


        toJSON():MineFieldState {
            var tiles = [];
            this.grid.forEach(function (row, column, tile) {
                tiles.push(tile);
            });
            return {
                tiles: tiles,
                unflaggedMineCount: this.unflaggedMineCount,
                mineCount: this.mineCount,
                height: this.grid.height,
                width: this.grid.width,
                loll:"test"
            };
        }
    }

}
