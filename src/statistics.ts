module minesweep {


    export interface DifficultyStatistics {
        won:number;
        lost:number;
        best:{
            time:number
            date: number
        };
    }

    function store(difficulty:string, data:DifficultyStatistics):void {
        localStorage.setItem('minesweep_' + difficulty, JSON.stringify(data));
    }

    function retrieve(difficulty:string):DifficultyStatistics {
        return JSON.parse(localStorage.getItem('minesweep_' + difficulty)) || {
                won: 0,
                lost: 0,
                best: {
                    time: 999,
                    date: Date.now()
                }
            }
    }

    export var statistics = {
        addGame: function (difficulty:string, time:number, won:boolean):void {

            var statistics = retrieve(difficulty);
            if (won) {
                statistics.won = statistics.won + 1;
            } else {
                statistics.lost = statistics.lost + 1;
            }
            if (time <= statistics.best.time) {
                statistics.best = {time: time, date: Date.now()}
            }

            store(difficulty, statistics);

        },
        get: function (difficulty:string):DifficultyStatistics {
            return retrieve(difficulty);
        }
    }
}