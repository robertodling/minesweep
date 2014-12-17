module minesweep {

    declare var React;
    declare var components;
    var status;
    var minefield;
    var config;

    export function start(_config) {
        status = 'running';
        config = _config || {
            columns: 16,
            rows: 16,
            mines: 10
        };

        minefield = new MineField(config.columns, config.rows, config.mines);

        render();
    }

    export function newGame() {
        status = 'new_game';
        render();
    }

    export function over() {
        if (status === 'running') {
            status = 'over';
            statistics.addGame(config.difficulty, 99, 'won');

            render();
        }
    }

    export function gridInteract(row:number, column:number, button:number):void {

        if (button === 2) {
            minefield.flag(row, column);
        } else if (button === 0) {
            minefield.check(row, column);
        }

        render();
    }


    export function render() {

        if (status === 'running') {

            var grid = minefield.toJSON();

            React.render(React.createElement(components.Grid, {
                grid: grid
            }), document.getElementById('main'));

            React.render(React.createElement(components.Status,
                {
                    difficulty: 'Beginner',
                    dimensions: {rows: 16, columns: 16},
                    timeElapsed: 90,
                    minesLeft: 10
                }
            ), document.getElementById('footer'));

        } else if (status === 'new_game') {
                React.render(React.createElement(components.NewGame,
                    {
                        difficulty: 'Begin',
                        dimensions: {rows: 16, columns: 16},
                        timeElapsed: 90,
                        minesLeft: 90
                    }
                ), document.getElementById('main'));
            document.getElementById('footer').innerHTML = "";

            } else if (status === 'over') {
                React.render(React.createElement(components.Result,
                    {
                        results: {
                            status: 'lost',
                            seconds: 21,
                            difficulty: 'Beginner'
                        },
                        statistics: statistics.get(config.difficulty)
                    }
                ), document.getElementById('footer'));
            }


    }

}
