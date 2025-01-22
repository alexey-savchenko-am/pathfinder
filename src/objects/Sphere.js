import { GameObject } from "../GameObject.js";
import { Sprite } from "../Sprite.js";
import { resources } from "../../Resources.js";
import { Direction } from "./Hero.js";
import { events } from "../../Events.js";

export class Sphere extends GameObject {
    constructor(position, width, height) {
        super(position, width, height);
        
        this._sprite = new Sprite({
            resource: resources.images.candle
        });

        this._isThrowing = false;
        this._throwDirection = null;
    }

    get isThrown() {
        return this._isThrowing;
    }

    throwTowards(vector) {
        this._isThrowing = true;
        this._throwDirection = vector;
    }

    stopThrowing() {
        this._isThrowing = false;
        this._throwDirection = null;
    }

    update(timestamp) {
        if(this._isThrowing) {
            const newPosition = this.getPosition.add(this._throwDirection);
            this.setPosition(newPosition);
            events.emit("OBJECT_THROWING", { object: this, position: newPosition } );
        }
        
    }

    draw(ctx, direction) {
        switch(direction) {
            case Direction.DOWN: 
                this._sprite.draw(ctx, this._centerX, this._centerY + 10, this.width, this.height);
                break;
            case Direction.UP: 
                if(this._isThrowing) {
                    this._sprite.draw(ctx, this._centerX, this._centerY + 10, this.width, this.height);
                }
                break;
            case Direction.LEFT: 
                this._sprite.draw(ctx, this._centerX - 5, this._centerY + 14, this.width, this.height);
                break;
            case Direction.RIGHT: 
                this._sprite.draw(ctx, this._centerX + 5, this._centerY + 14, this.width, this.height);
                break;
        }
    }
}