module minesweep {

    declare var React;
    declare var components;

    export function start(config) {
        var game = minesweep.game;

        config = config || {
            columns: 16,
            rows: 16,
            mines: 10
        };

        config.width = 20;
        config.height = 20;
        game.init(config);
        game.redraw();
    }

    export function render(config, state, board) {

        React.render(React.createElement(components.Board, {
            config: config,
            state: state,
            board: board
        }), document.getElementById('main'));

        React.render(React.createElement(components.Status,
            {state: state}
        ), document.getElementById('status'));

        React.render(React.createElement(components.NewGame,
            {state: state}
        ), document.getElementById('new-game'));

    }

}
