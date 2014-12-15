module minesweep {

    export var game = {
        init: function (config) {


            this.config = config;
            this.state = {
                alive: true,
                unflagged: config.mines
            };

            var _grid = this._grid = Object.create(grid);
            grid.init(config.rows, config.columns, config.mines);
        },

        redraw: function ():void {
            render(this.config, this.state, this._grid.toJSON());
        },

        getState: function ():any {
            return this.state;
        },

        gridInteract: function (row:number, column:number, button:number):void {

            if (button === 2) {
                this._grid.flag(row, column);
            } else if (button === 0) {
                this._grid.check(row, column);
            }

            this.redraw();
        }
    };


}