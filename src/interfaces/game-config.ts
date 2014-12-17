module minesweep {
    export interface GameConfig {
        difficulty:string;
        width:number;
        height:number;
        mineCount: number;
        elapsed:number;
        status:GameStatus;
    }
}