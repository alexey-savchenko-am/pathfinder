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
        this.onEndpointReach = null;
        this._selected = false;
    }

    get getPosition() {
        return this._position;
    }

    select() {
        this._selected = true;
    }

    deselect() {
        this._selected = false;
    }


    subscribeOnEndpointReach(onEndpointReach) {
        this.onEndpointReach = onEndpointReach;
    }

    appendChild(child) {
        this._children.push(child);
    }

    removeChild(child) {
        this._children = this._children.filter(ch => child !== ch);
    }

    getTileByCoordinates(x, y) {
        const row = Math.floor(y / this._tileSize);
        const col = Math.floor(x / this._tileSize);
        return new Vector2D(row, col);
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