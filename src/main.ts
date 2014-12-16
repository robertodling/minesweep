module minesweep {

    declare var React;
    declare var components;
    var status;

    export function start(config) {
        status = 'running';
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

    export function newGame(){
        status = 'new_game';
        game.redraw();
    }

    export function over(){
        status = 'over';
        game.redraw();
    }



    export function render(config, state, grid) {

        React.render(React.createElement(components.Grid, {
            config: config,
            state: state,
            grid: grid
        }), document.getElementById('main'));

        if (status === 'running') {
            React.render(React.createElement(components.Status,
                {
                    difficulty: 'Begin',
                    dimensions: {rows: 16, columns: 16},
                    timeElapsed: 90,
                    minesLeft: 10
                }
            ), document.getElementById('footer'));

        }

        if (status === 'new_game') {
            React.render(React.createElement(components.NewGame,
                {
                    difficulty: 'Begin',
                    dimensions: {rows: 16, columns: 16},
                    timeElapsed: 90,
                    minesLeft: 90
                }
            ), document.getElementById('footer'));

        }

        if (status === 'over') {
            React.render(React.createElement(components.Result,
                {
                    results: {
                        status: 'lost',
                        seconds: 21,
                        difficulty: 'Beginner'
                    },
                    statistics: {
                        best: {
                            seconds: 24,
                            date: 'sdfsdf'
                        },
                        played: 21,
                        won: 1,
                        wonPercent: 4
                    }
                }
            ), document.getElementById('footer'));
        }

    }

}
