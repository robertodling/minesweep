module minesweep {



    declare var React;
    declare var components;

    var status:GameStatus;
    var minefield:MineField;
    var config:GameConfig;

    export function start(_config:GameConfig):void {
        status = GameStatus.Running;
        config = _config || {
            width: 16,
            height: 16,
            mineCount: 10
        };

        minefield = new MineField(config.height, config.width, config.mineCount);

        render();
    }

    export function newGame():void {
        status = GameStatus.NewGame;
        render();
    }

    export function gameOver(won:boolean):void {
        if (status === GameStatus.Running) {
            status = won?GameStatus.Won:GameStatus.Lost;
            statistics.addGame(config.difficulty, 99, won);

            render();
        }
    }

    export function interact(row:number, column:number, type:InteractType):void {

        if (type === InteractType.RightClick) {
            minefield.flag(row, column);
        } else if (type === InteractType.RightClick) {
            minefield.reveal(row, column);
        }

        render();
    }


    export function render():void {

        if (status === GameStatus.Running) {
            renderRunning();
        } else if (status === GameStatus.NewGame) {
            renderNewGame();
        } else if (status === GameStatus.Won || status === GameStatus.Lost) {
            renderGameOver();
        }

    }

    function renderRunning():void {
        var mineFieldState:MineFieldState = minefield.toJSON();

        React.render(React.createElement(components.Board, {
            tiles: mineFieldState.tiles,
            width: mineFieldState.width,
            height: mineFieldState.height
        }), document.getElementById('main'));

        React.render(React.createElement(components.Status,
            {
                difficulty: config.difficulty,
                width: mineFieldState.width,
                height: mineFieldState.height,
                elapsedTime: 99,
                mineCount: mineFieldState.unflaggedMineCount
            }
        ), document.getElementById('footer'));
    }

    function renderNewGame():void {
        React.render(React.createElement(components.NewGame,
            {}
        ), document.getElementById('main'));
        document.getElementById('footer').innerHTML = "";
    }

    function renderGameOver():void {
        var stats = statistics.get(config.difficulty);
        React.render(React.createElement(components.GameOver,
            {
                game: config,
                statistics: stats
            }
        ), document.getElementById('footer'));
    }

}
