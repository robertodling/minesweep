module minesweep {

    // globals
    declare var React;
    declare var components;

    export enum GameStatus {Running, NewGame, Won, Lost}
    export enum InteractType {LeftClick=0, RightClick=2} // maps to react button type

    var minefield:MineField;
    var state:GameState;

    export function start(difficulty):void {
        if(!difficulty){
            difficulty = difficulties['intermediate'];
        }

        state = {
            elapsed: 0,
            status: GameStatus.Running,
            difficulty:difficulty.name.toLowerCase()
        };

        minefield = new MineField(difficulty.height, difficulty.width, difficulty.mineCount);

        render();
    }

    export function newGame():void {
        state.status = GameStatus.NewGame;
        render();
    }

    export function gameOver(won:boolean):void {
        if (state.status === GameStatus.Running) {
            state.status = won ? GameStatus.Won : GameStatus.Lost;
            Statistics.gamePlayed(state.difficulty, state.elapsed, won);

            render();
        }
    }

    export function interact(row:number, column:number, type:InteractType):void {

        if (type === InteractType.RightClick) {
            minefield.flag(row, column);
        } else if (type === InteractType.LeftClick) {
            minefield.reveal(row, column);
        }

        render();
    }


    export function render():void {

        if (state.status === GameStatus.Running) {
            renderRunning();
        } else if (state.status === GameStatus.NewGame) {
            renderNewGame();
        } else if (state.status === GameStatus.Won || state.status === GameStatus.Lost) {
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
                difficulty: state.difficulty,
                width: mineFieldState.width,
                height: mineFieldState.height,
                elapsedTime: 99,
                mineCount: mineFieldState.unflaggedMineCount
            }
        ), document.getElementById('footer'));
    }

    function renderNewGame():void {
        React.render(React.createElement(components.NewGame,
            {
                difficulties:difficulties,
                difficulty:state.difficulty
            }
        ), document.getElementById('main'));

        document.getElementById('footer').innerHTML = "";
    }

    function renderGameOver():void {
        var stats = Statistics.getForDifficulty(state.difficulty);
        React.render(React.createElement(components.GameOver,
            {
                game: state,
                statistics: stats
            }
        ), document.getElementById('footer'));
    }

}
