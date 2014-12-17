module minesweep {
    export interface MineFieldState {
        tiles: Array<Tile>;
        unflaggedMineCount: number;
        mineCount: number;
        height: number;
        width: number;
    }
}