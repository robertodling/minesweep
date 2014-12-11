module minesweep {
    declare var React;
    declare var components;
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

    export function render(config, state, board) {

        var Board = components.Board;
        var Status = components.Status;

        React.render(React.createElement(Board, {
            config: config,
            state: state,
            board: board
        }), document.getElementById('main'));
        React.render(React.createElement(Status, {state: state}), document.getElementById('status'));

    }

}
