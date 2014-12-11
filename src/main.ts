module minesweep {

    var config = {
        width: 18,
        height: 18,
        bombs: 20,
        rows: 20,
        columns: 20
    };

    export function start() {
           var game = minesweep.game;

            game.init(config);
            game.redraw();
    }

}
