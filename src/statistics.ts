module minesweep {

    function store(difficulty, data) {
        localStorage.setItem('minesweep_' + difficulty, JSON.stringify(data));
    }

    function retrieve(difficulty) {
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
        addGame: function (difficulty, time, status) {

            var statistics = retrieve(difficulty);
            if (status === 'won') {
                statistics.won = statistics.won + 1;
            } else {
                statistics.lost = statistics.lost + 1;
            }
            if (time <= statistics.best.time) {
                statistics.best = {time: time, date: Date.now()}
            }
            store(difficulty, statistics);

        },
        get: function (difficulty) {
            return retrieve(difficulty);
        }
    }
}