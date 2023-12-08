import { Settings } from "../Settings.js";
import { Vector2D } from "./Vector2D.js";

export class GameObject {

    constructor(position, width, height, inputHandler) {
        this._position = position;
        this.width = width;
        this.height = height;
        this.settings = new Settings();
        this._tileSize = this.settings.getTileSize;
        this._x = position.getCol * this._tileSize;
        this._y = position.getRow * this._tileSize;
        this._centerX = ((this._tileSize - this.width) / 2) + this._x;
        this._centerY = ((this._tileSize - this.height) / 2) + this._y;
        this._children = [];
        this._inputHandler = inputHandler;
        this._selected = false;
        this._isMarkAsDeleted = false;
    }

    get childrenCount() {
        return this._children.length;
    }
    
    get getPosition() {
        return this._position;
    }

    get position() {
        return this._position;
    }

    get left() { 
        return this._x; 
    }

    get top() {
        return this._y;
    }

    get right() {
        return this._x + this.width;
    }

    get bottom() {
        return this._y + this.height;
    }

    getAndRemoveChild() {
        if(this._children.length === 0) {
            return null;
        }

        const child = this._children[0];
        this._children.shift();
        return child;
    }

    setPosition(position) {
        this._position = position.clone();
        this._x = position.getCol * this._tileSize;
        this._y = position.getRow * this._tileSize;
        this._centerX = ((this._tileSize - this.width) / 2) + this._x;
        this._centerY = ((this._tileSize - this.height) / 2) + this._y;
    }

    select() {
        this._selected = true;
    }

    deselect() {
        this._selected = false;
    }

    appendChild(child) {
        this._children.push(child);
    }

    removeChild(child) {
        this._children = this._children.filter(ch => child !== ch);
    }

    getDelta(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return {dx, dy};
    }

    handleInputEvent() {

        if(!this._inputHandler) {
            return;
        }
        
        const command = this._inputHandler.handle(this);

        if(command) {
            command.execute();
        }
    }

    moveTo(x, y) {

    }

    draw(ctx) {

    }
}