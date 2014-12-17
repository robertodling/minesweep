module minesweep {
    export interface DifficultyStatistics {
        won:number;
        lost:number;
        best:{
            time:number
            date: number
        };
    }
}