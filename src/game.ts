module minesweep {

    export var game = {
        init: function (config) {

            var _board = minesweep.board;

            this.config = config;
            this.state = {
                alive: true,
                unflagged: config.mines
            };

            var board = this.board = Object.create(_board);
            board.init(config.rows, config.columns, config.mines);
        },

        redraw: function ():void {
            minesweep.render(this.config, this.state, this.board.toJSON());
        },

        getState: function ():any {
            return this.state;
        },

        boardInteract: function (row:number, column:number, button:number):void {

            if (button === 2) {
                this.board.flag(row, column);
            } else if (button === 0) {
                this.board.check(row, column);
            }

            this.redraw();
        }
    };


}