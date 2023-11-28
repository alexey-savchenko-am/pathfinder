
export class Vector2D {
    
    constructor(row, col) {
        this._row = row;
        this._col = col;
    }

    get getRow() {
        return this._row;
    }

    get getCol() {
        return this._col;
    }

    get getString() {
        return `(${this._row};${this._col})`;
    }

    equalsTo(vector) {
        return vector.getRow === this._row && vector.getCol === this._col;
    }

    clone() {
        return new Vector2D(this._row, this._col);
    }
}