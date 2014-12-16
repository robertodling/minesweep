module minesweep {

    function getRandomInt(min, max):number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    export class Grid {

        private rows:Array<any>;

        constructor(public width:number, public height:number, generator?:any) {
            if (generator) {
                this.fill(generator);
            }
        }

        fill(generator) {

            this.rows = [];
            for (var row = 0; row < this.height; row++) {
                var columns:Array<any> = [];

                for (var column = 0; column < this.width; column++) {
                    columns.push(generator(row, column));
                }

                this.rows.push(columns);
            }
        }

        get(row, column) {
            return this.rows[row][column];
        }

        set(row, column, value) {
            this.rows[row][column] = value;
        }

        getRandom() {
            var row:number = getRandomInt(0, this.height);
            var column:number = getRandomInt(0, this.width);
            return this.rows[row][column];
        }

        getAdjecent(row, column) {
            var self = this;
            var adjecent = [];
            [-1 + row, row, 1 + row].forEach(function (r) {
                [-1 + column, column, 1 + column].forEach(function (c) {

                    if (!(c === column && r === row) && r >= 0 && r < self.height &&
                        c >= 0 && c < self.width) {
                        adjecent.push(self.get(r, c));
                    }

                });
            });
            return adjecent;
        }

        forEach(visitor) {
            for (var row = 0; row < this.height; row++) {
                for (var column = 0; column < this.width; column++) {
                    visitor(row, column, this.get(row, column))
                }

            }
        }
    }

}