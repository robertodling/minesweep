module minesweep {

    function getRandomInt(min:number, max:number):number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    export class Grid<T> {

        private rows:Array<Array<T>>;

        constructor(public width:number, public height:number, generator?:Function) {
            if (generator) {
                this.fill(generator);
            }
        }

        fill(generator:Function) {

            this.rows = [];
            for (var row = 0; row < this.height; row++) {
                var columns:Array<T> = [];

                for (var column = 0; column < this.width; column++) {
                    columns.push(generator(row, column));
                }

                this.rows.push(columns);
            }
        }

        get(row:number, column:number):T {
            return this.rows[row][column];
        }

        set(row:number, column:number, value:T):void {
            this.rows[row][column] = value;
        }

        getRandom():T {
            var row:number = getRandomInt(0, this.height);
            var column:number = getRandomInt(0, this.width);
            return this.rows[row][column];
        }

        getAdjacent(row:number, column:number):Array<T> {
            var self = this;
            var adjacent:Array<T> = [];
            //TODO clean up
            [-1 + row, row, 1 + row].forEach(function (r) {
                [-1 + column, column, 1 + column].forEach(function (c) {

                    if (!(c === column && r === row) && r >= 0 && r < self.height &&
                        c >= 0 && c < self.width) {
                        adjacent.push(self.get(r, c));
                    }

                });
            });
            return adjacent;
        }

        forEach(visitor:Function):void {
            for (var row = 0; row < this.height; row++) {
                for (var column = 0; column < this.width; column++) {
                    visitor(row, column, this.get(row, column))
                }

            }
        }
    }
}