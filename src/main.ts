module minesweep {


    interface GameConfig {
        difficulty:string;
        width:number;
        height:number;
        mineCount: number;
    }
    enum GameStatus {Running, NewGame, GameOver}

    declare var React;
    declare var components;

    var status:GameStatus;
    var minefield:MineField;
    var config:GameConfig;


    export function start(_config:any):void {
        status = GameStatus.Running;
        config = _config || {
            columns: 16,
            rows: 16,
            mines: 10
        };

        minefield = new MineField(config.width, config.height, config.mineCount);

        render();
    }

    export function newGame():void {
        status = GameStatus.NewGame;
        render();
    }

    export function over(won:boolean):void {
        if (status === GameStatus.Running) {
            status = GameStatus.GameOver;
            statistics.addGame(config.difficulty, 99, won);

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


    export function render():void {

        if (status === GameStatus.Running) {

            var grid = minefield.toJSON();

            React.render(React.createElement(components.Grid, {
                grid: grid
            }), document.getElementById('main'));

            React.render(React.createElement(components.Status,
                {
                    difficulty: config.difficulty,
                    dimensions: {rows: config.width, columns: config.height},
                    timeElapsed: 90,
                    minesLeft: config.mineCount
                }
            ), document.getElementById('footer'));

        } else if (status === GameStatus.NewGame) {
                React.render(React.createElement(components.NewGame,
                    {
                        difficulty: 'Beginner',
                        dimensions: {rows: 16, columns: 16},
                        timeElapsed: 90,
                        minesLeft: 90
                    }
                ), document.getElementById('main'));
            document.getElementById('footer').innerHTML = "";

            } else if (status === GameStatus.GameOver) {
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
