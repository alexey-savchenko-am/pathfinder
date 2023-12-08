import { GameObject } from "../GameObject.js";
import { Vector2D } from "../Vector2D.js";

export const DisplayMode = {
    DarkMode : "dark",
    LightMode: "light"
};

export class Tile extends GameObject {
    constructor(position, { darkTerrain, lightTerrain }) {
        super(position, 75, 75);

        this._isSelected = false;
        this._darkTerrain = darkTerrain;
        this._lightTerrain = lightTerrain;
        this._displayMode = DisplayMode.DarkMode;
    }

    get terrain() {
        if(this._displayMode === DisplayMode.DarkMode) {
            return this._darkTerrain;
        }

        return this._lightTerrain;
    }

     setTerrain({ darkTerrain, lightTerrain }) {
        this._darkTerrain = darkTerrain;
        this._lightTerrain = lightTerrain;
    }

    get isSelected() {
        return this._isSelected;
    }

    select() {
        this._isSelected = true;
    }

    deselect() {
        this._isSelected = false;
    }


    /**
     * @param {DisplayMode} displayMode
     */
    set displayMode (displayMode) {
        this._displayMode = displayMode;
    }

    /**
     * 
     * @param {GameObject} object 
     */
    isCollideWith(object) {
        return (
            this.left < object.right
            && this.right > object.left
            && this.top < object.bottom
            && this.bottom > object.top
        );
    }

    update(timestamp) {
        this._children.forEach(
            child => {
                child.update(timestamp);
                if(child._isCollected) {
                    this.removeChild(child);
                }
            }
        );
    }

    draw(ctx) {
        if(this._displayMode === DisplayMode.DarkMode) {
            this._darkTerrain.draw(ctx, this._x, this._y, this.width, this.height);
        } else {
            this._lightTerrain.draw(ctx, this._x, this._y, this.width, this.height);
            this._children.forEach(child => child.draw(ctx));
        }

        if (this._isSelected) {
            ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
            ctx.fillRect(this._x, this._y, this.width, this.height);
        }
    }
}