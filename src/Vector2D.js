export function VectorMap() {
    this._vectors = {};
}

VectorMap.prototype = {

    get: function(vector) {
       return this._vectors[vector.getString];
    },

    add: function(vector, object) {
        this._vectors[vector.getString] = object;
    },

    remove: function(vector) {
        const key = vector.getString;
        if(this.contains(key)) {
            delete this._vectors[key];
        }
    },

    contains: function(vector) {
        const key = vector.getString;
        return this._vectors.hasOwnProperty(key);
    },

    forEach: function(callback) {
        for(const key in this._vectors) {
            if(this._vectors.hasOwnProperty(key)) {
                callback(this._vectors[key]);
            }
        }
    }
}

export function Vector2D(row, col) {
    this._row = row;
    this._col = col;
}

Vector2D.prototype = {
    get getRow() {
        return this._row;
    },

    get getCol() {
        return this._col;
    },

    get getString() {
        return `(${this._row};${this._col})`;
    },

    hashCode: function () {
        return `${this._row}-${this._col}`;
    },
    
    equalsTo: function (vector) {
        return vector.getRow === this._row && vector.getCol === this._col;
    },

    clone: function () {
        return new Vector2D(this._row, this._col);
    },

    round: function() {
        return new Vector2D(Math.ceil(this._row), Math.ceil(this._col));
    },

    add: function (vector) {
        return new Vector2D(this._row + vector.getRow, this._col + vector.getCol);
    },

    sub: function (vector) {
        return new Vector2D(this._row - vector.getRow, this._col - vector.getCol);
    },

    distance: function (vector) {
        return Math.abs(this._row - vector.getRow) + Math.abs(this._col - vector.getCol);
    },

    intersect: function (vector) {
        const crossProduct = vector.row * this._col - vector._col * this._row;
        
        return crossProduct !== 0;
    },

    left: function () {
        return new Vector2D(Math.ceil(this._row), Math.ceil(this._col - 1));
    },

    right: function () {
        return new Vector2D(Math.ceil(this._row), Math.ceil(this._col + 1));
    },

    bottom: function () {
        return new Vector2D(Math.ceil(this._row + 1), Math.ceil(this._col));
    },

    top: function () {
        return new Vector2D(Math.ceil(this._row - 1), Math.ceil(this._col));
    },

    topLeft: function () {
        return new Vector2D(Math.ceil(this._row - 1), Math.ceil(this._col - 1));
    },

    topRight: function () {
        return new Vector2D(Math.ceil(this._row - 1), Math.ceil(this._col + 1));
    },

    bottomLeft: function () {
        return new Vector2D(Math.ceil(this._row + 1), Math.ceil(this._col - 1));
    },

    bottomRight: function () {
        return new Vector2D(Math.ceil(this._row + 1), Math.ceil(this._col + 1));
    }
};
