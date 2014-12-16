module minesweep {

    export var game = {
        init: function (config) {


            this.config = config;
            this.state = {
                alive: true,
                unflagged: config.mines
            };

            var _minefield = this._minefield = Object.create(minefield);
            _minefield.init(config.rows, config.columns, config.mines);
        },

        redraw: function ():void {
            render(this.config, this.state, this._minefield.toJSON());
        },

        getState: function ():any {
            return this.state;
        },

        gridInteract: function (row:number, column:number, button:number):void {

            if (button === 2) {
                this._minefield.flag(row, column);
            } else if (button === 0) {
                this._minefield.check(row, column);
            }

            this.redraw();
        }
    };

}