module minesweep {
    export class Tile {
        public isRevealed:boolean;
        public isFlagged:boolean;

        constructor(public row:number, public column:number) {
            this.isRevealed = false;
            this.isFlagged = false;
        }
    }
}