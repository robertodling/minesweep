module minesweep {
    export interface GameState {
        difficulty:string;
        elapsed:number;
        status:GameStatus;
    }
}